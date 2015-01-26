module.exports = function(app){

    var passport = require('passport');
    var flash = require('connect-flash');
    var mongoose = require('mongoose');
    var User = require('../models/user.js');

    app.disable('etag');

    require('./passport.js')(app);


    app.get('/', function(req, res){
        res.render('index');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated())
        { return next(); }
        res.redirect('/auth');
    }

    app.get('/index', ensureAuthenticated, function(req, res){
        res.render('index');
    });

    app.get('/viewstream/:streamid', function(req, res){
        var Stream = require('../models/stream.js');
        Stream.findById(req.param('streamid'), function(err, stream){
            if (err) {
                res.status(404);
                res.render(404);
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

    app.get('/signup', function(req, res){
        res.render('signup');
    });

    app.get('/help', function(req, res){
        res.render('help');
    });

    app.get('/profile', function(req, res){
        res.render('profile');
    });

    app.get('/map', function(req, res){
        res.render('map');
    });

    app.get('/track', function(req, res){
        res.render('track.gpx');
    });

    app.get('/setting', function(req, res){
        res.render('setting');
    });

    app.get('/auth', function(req, res){
        res.render('auth');
    });

    app.post('/process', passport.authenticate('local-signup', {
        successRedirect : '/index',
        failureRedirect : '/signup',
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/index',
        failureRedirect : '/index',
    }));

    app.get('/logout', ensureAuthenticated, function(req, res){
        req.logout();
        req.session.user = undefined;
        res.locals.user = undefined;
        res.render('index');
    });

    app.get('/user/profile/:userId', function(req, res, done){
        var user = User.findById(req.params.userId, function(err, user) {

            if (err) {
                console.error(err);
                res.status(404);
                res.render(404);
            }
            else {
                res.render('profile', {user: user});
            }

        });

    });

    //----------------------------------------------------------------------------------
    // we redirect the HTTP requests
    //----------------------------------------------------------------------------------
    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });


    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });

};
