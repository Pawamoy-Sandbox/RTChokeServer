var mongoose = require('mongoose');

// not sure that it is needed
//var User = require('./user')

var streamSchema = mongoose.Schema({
    id: Number,
    name: String,
    created: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    keywords: [String],
    description: String,
    is_public: Boolean,
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StreamData'
    }
});

var findOrCreate = require('mongoose-findorcreate');
streamSchema.plugin(findOrCreate);

var Stream = mongoose.model('Stream', streamSchema);
module.exports = Stream;
