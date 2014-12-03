var mongoose = require('mongoose');

// todo: maybe add backward relation to stream

var chatSchema = mongoose.Schema({
    id: Number,
    open: Boolean,
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage'
    }]
});

var findOrCreate = require('mongoose-findorcreate');
chatSchema.plugin(findOrCreate);

var Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
