'use strict';

module.exports = function (server) {
    var User = require('../models/user.js');

    server.get('/profile', function (req, res) {
        res.render('profile');
    });

    server.get('/setting', function (req, res) {
        res.render('setting');
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
