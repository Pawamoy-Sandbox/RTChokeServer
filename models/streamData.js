var mongoose = require('mongoose');

var streamDataSchema = mongoose.Schema({
    id: Number,
    geoloc: [{
        type: mongoose.Schema.Typs.ObjectId,
        ref: 'Geoloc'
    }]
});

var findOrCreate = require('mongoose-findorcreate');
streamDataSchema.plugin(findOrCreate);

var StreamData = mongoose.model('StreamData', streamDataSchema);
module.exports = StreamData;
