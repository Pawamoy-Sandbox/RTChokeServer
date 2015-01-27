module.exports = function(app){
    var Stream = require('../models/stream.js');

    app.get('/viewstream/:streamId', function(req, res){
        Stream.findById(req.params.streamId, function(err, stream){
            if (err) {
                res.status(404);
                res.render('errors/404');
            }
            res.render('viewstream', {stream: stream});
        });
    });

    app.get('/viewstream', function(req, res){
        res.render('viewstream');
    });

    app.get('/stream', function(req, res){
        res.render('stream');
    });
};
