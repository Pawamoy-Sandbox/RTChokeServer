var mongoose = require('mongoose');

var geolocSchema = mongoose.Schema({
    id: Number,
    time: Date,
    coordinates: {
        // todo, check how it is used with OpenStreetMap
    }
});

var findOrCreate = require('mongoose-findorcreate');
geolocSchema.plugin(findOrCreate);

var Geoloc = mongoose.model('Geoloc', geolocSchema);
module.exports = Geoloc;
