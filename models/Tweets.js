var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tweetSchema = new Schema({
    id_str: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: String, required: true },
})
module.exports = Tweet = mongoose.model('Tweet', tweetSchema);