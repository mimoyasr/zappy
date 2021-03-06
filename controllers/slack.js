var express = require('express');
var request = require('request');
var Msg = require('../models/Messages');
var router = express.Router();
const conf = require('../conf.json');
var updateTweets = require('./twitter').update;
const trigger_pattern = new RegExp('.*go.*', "i");


var addMsg = data => {
    var msg = new Msg();
    msg.ts = data.ts;
    msg.text = data.text;
    msg.save();
}

var getLastMsgQuery = () => {
    return Msg.findOne().sort({ field: 'asc', ts: -1 }).limit(1)
}

var checkForGo = (last, res) => {
    let options = {
        uri: `https://slack.com/api/channels.history?token=${conf.slack.token}&channel=${conf.slack.channel}&oldest=${last}&pretty=1`,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        let triggerd = false;
        var JSONresponse = JSON.parse(body)
        if (JSONresponse.ok) {
            let msgs = JSONresponse.messages;
            for (var i = 0; i < msgs.length; i++) {
                var msg = msgs[i];
                addMsg(msg);
                if (msg.text.match(trigger_pattern)) {
                    console.log(`triggerd : ${msg.text}`);
                    triggerd = true
                }

            }
            if (triggerd)
                updateTweets()
        }
    });
}

var updateMsgs = () => {
    getLastMsgQuery().exec(function(err, doc) {
        if (!err)
            if (doc)
                checkForGo(doc.ts);
            else
                checkForGo(0);
    });
}

router.post('/seed', (req, res) => {
    updateMsgs();
    res.setHeader('Content-Type', 'application/json');
    res.send({ "status": "ok" });
});

if (conf.env == "dev") {

    router.get('/last', (req, res) => {
        getLastMsgQuery().exec(function(err, doc) {
            if (err)
                return console.log(err);
            res.send(doc);
        });
    });

    router.get('/clean', (req, res) => {
        Msg.remove({}, (err, ok) => {
            if (err)
                res.send({ "status": err });
            else
                res.send({ "status": "ok" });

        });
    });

    router.get('/', (req, res) => {
        Msg.find(function(err, doc) {
            if (!err) {
                res.send(doc)
            }
        })

    });
}

module.exports = router;