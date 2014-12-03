var mongoose = require('mongoose');

// todo: maybe add backward relation to chat room

var chatMessageSchema = mongoose.Schema({
    id: Number,
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Date
});

var findOrCreate = require('mongoose-findorcreate');
chatMessageSchema.plugin(findOrCreate);

var ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;
