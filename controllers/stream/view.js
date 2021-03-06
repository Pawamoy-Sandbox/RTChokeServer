'use strict';

module.exports = function (server) {
    var Stream = require('../../models/stream.js');

    server.get('/:streamId', function(req, res){
        Stream.findById(req.params.streamId, function(err, stream){
            if (err) {
                res.status(404);
                res.render('errors/404');
            }
            res.render('viewstream', {stream: stream});
        });
    });

    server.get('/', function(req, res){
        res.render('viewstream');
    });
};
