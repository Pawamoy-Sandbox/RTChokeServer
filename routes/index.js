module.exports = function(app){
    var helpers = require('../lib/helpers.js');

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/index', function(req, res){
        var Stream = require('../models/stream.js');
        var mostPopularStreams = Stream.find({}, {}, { sort: { 'views': -1} }, function(err, post){
            console.log(post);
        }).limit(4);

        //console.log(mostPopularStreams);
        res.render('index', {
            'mostPopular': mostPopularStreams
        });
    });

    app.get('/help', function(req, res){
        res.render('help');
    });
};
