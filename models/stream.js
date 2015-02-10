'use strict';

var mongoose = require('mongoose');

var streamSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    created: Date,
    closed: Date,
    last_alive: Date,
    video_filepath: String,
    thumbnailUrl: String,
    views: Number,
    numRatings: Number,
    meanRatings: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublic: Boolean,
    keywords: [String],
    chat: {
        open: Boolean,
        messages: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: String,
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
