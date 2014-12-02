var mongoose = require('mongoose');

var User = require('./user')

var streamSchema = mongoose.Schema({
    id: Number,
    name: String,
    created: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var findOrCreate = require('mongoose-findorcreate');
streamSchema.plugin(findOrCreate);

var Stream = mongoose.model('Stream', streamSchema);
module.exports = Stream;
