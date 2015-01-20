var mongoose = require('mongoose');

var streamSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    created: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_public: Boolean,
    keywords: [String],
    chat: {
        open: Boolean,
        messages: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: Text,
            timestamp: Date
        }]
    },
    data: {
        url: String,
        ride: [{
            latitude: String,
            longitude: String,
            timestamp: Date
        }]
    }
});

var findOrCreate = require('mongoose-findorcreate');
streamSchema.plugin(findOrCreate);

var Stream = mongoose.model('Stream', streamSchema);
module.exports = Stream;
