var express = require('express');
var request = require('request');
var Msg = require('../models/Messages');
var router = express.Router();
const trigger_pattern = new RegExp('.*go.*', "i");

var addMsg = data => {
    var msg = new Msg();
    msg.ts = data.ts;
    msg.text = data.text;
    msg.save();
}

var getLastMsgQuery = () => {
    return Msg.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
}

var checkForGo = last => {
    let options = {
        uri: `https://slack.com/api/channels.history?token=xoxp-362716750658-362489754468-362064847232-6a502ce08b7d0b614b206e4747485107&channel=CANR4EQ21&pretty=1&oldest=${last}`,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (JSONresponse.ok) {
            let msgs = JSONresponse.messages;
            for (var i = 0; i < msgs.length; i++) {
                var msg = msgs[i];
                addMsg(msg);
                if (msg.text.match(GO))
                    console.log(`triggerd : ${msg.text}`);
            }
        }
    });
}

router.get('/last', (req, res) => {
    getLastMsgQuery().exec(function(err, doc) {
        if (err)
            return console.log(err);
        res.send(doc);
    });
});

router.get('/seed', (req, res) => {
    getLastMsgQuery().exec(function(err, doc) {
        if (!err)
            checkForGo(doc.ts);
    });
    res.send({ "status": "ok" });
});

router.get('/clean', (req, res) => {
    Msg.remove({}, (err, ok) => {
        if (err)
            res.send({ "status": err });
        else
            res.send({ "status": "ok" });

    });
});

router.get('/msgs', (req, res) => {
    Msg.find(function(err, doc) {
        if (!err) {
            res.send(doc)
        }
    })

});