var Twitter = require('twitter');
var express = require('express');
var request = require('request');
var Tweet = require('../models/Tweets');
var router = express.Router();
const conf = require('../conf.json');

var addTweet = data => {
    var tweet = new Tweet();
    tweet.id_str = data.id_str;
    tweet.user = data.user.name;
    tweet.text = data.text;
    tweet.created_at = data.created_at;
    tweet.save();
}

var getLastTweetQuery = () => {
    return Tweet.findOne().sort({ field: 'asc', id_str: -1 }).limit(1)
}

var updateTweets = last => {
    console.log(last);
    var params = {
        screen_name: 'zappy',
        since_id: `${last}`,
        exclude_replies: true,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        console.log(tweets);
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i];
                addTweet(tweet);
            }
        } else {
            console.log(error)
        }
    });
}

var callUpdate = () => {
    getLastTweetQuery().exec(function(err, doc) {
        if (!err && doc)
            updateTweets(doc.id_str);
        else
            updateTweets("1");
    });
}

var client = new Twitter({
    consumer_key: `${conf.twitter.consumer_key}`,
    consumer_secret: `${conf.twitter.consumer_secret}`,
    access_token_key: `${conf.twitter.access_token}`,
    access_token_secret: `${conf.twitter.access_token_secret}`
});

router.get('/update', (req, res) => {
    callUpdate()
    res.send({ "status": "ok" });
});

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    Tweet.find().lean().exec(function(err, tweets) {
        if (!err)
            res.send(JSON.stringify(tweets));
        else
            res.send(error);
    });
});

router.get('/last', (req, res) => {
    getLastTweetQuery().exec(function(err, doc) {
        if (err)
            return console.log(err);
        res.send(doc);
    });
});


router.get('/clean', (req, res) => {
    Tweet.remove({}, (err, ok) => {
        if (err)
            res.send({ "status": err });
        else
            res.send({ "status": "ok" });

    });
});


module.exports.router = router;
module.exports.update = callUpdate;