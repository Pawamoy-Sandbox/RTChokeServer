'use strict';

module.exports = function (server) {
    var passport = require('passport');
    var helpers = require('../lib/helpers.js');

    server.get('/auth', function (req, res) {
        res.render('auth');
    });

    server.post('/process', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/signup'
    }));

    server.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/index'
    }));

    server.get('/logout', helpers.ensureAuthenticated, function (req, res) {
        req.logout();
        req.session.user = undefined;
        res.locals.user = undefined;
        res.render('index');
    });

    server.get('/signup', function (req, res) {
        res.render('signup');
    });
};
