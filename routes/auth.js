module.exports = function(app) {
    var passport = require('passport');
    var helpers = require('../lib/helpers.js');

    app.get('/auth', function (req, res) {
        res.render('auth');
    });

    app.post('/process', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/signup'
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/index'
    }));

    app.get('/logout', helpers.ensureAuthenticated, function (req, res) {
        req.logout();
        req.session.user = undefined;
        res.locals.user = undefined;
        res.render('index');
    });

    app.get('/signup', function(req, res){
        res.render('signup');
    });
};