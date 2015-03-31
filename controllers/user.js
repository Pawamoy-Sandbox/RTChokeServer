'use strict';

module.exports = function (server) {
    var User = require('../models/user.js');

    server.get('/profile', function (req, res) {
        res.render('profile');
    });

    server.get('/settings', function (req, res) {
        res.render('settings');
    });

    server.get('/profile/:userId', function (req, res, done) {
        var user = User.findById(req.params.userId, function(err, user) {

            if (err) {
                console.error(err);
                res.status(404);
                res.render('errors/404');
            }
            else {
                res.render('profile', {user: user});
            }

        });
    });
};
