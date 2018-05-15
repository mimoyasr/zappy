var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    id_str: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: String, required: true },
})
module.exports = Msg = mongoose.model('Message', messageSchema);