var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    ts: { type: String, required: true },
    text: { type: String, required: true },
})
module.exports = Msg = mongoose.model('Message', messageSchema);