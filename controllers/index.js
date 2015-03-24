'use strict';

var streamModel = require('../models/stream');

module.exports = function (server) {

    var model = new streamModel();

    server.get('/', function (req, res) {
        res.redirect('index');
    });

    server.get('/index', function (req, res) {

        //TODO: get latest stream
        var mostPopularStreams = streamModel.find({}, {}, { sort: { 'views': -1} }, function(err, post){
            console.log(post);
        }).limit(4);
        //console.log(mostPopularStreams);
        res.render('index', {
            'mostPopular': mostPopularStreams
        });
    });

    server.get('/help', function(req, res) {
        res.render('help');
    });
};
