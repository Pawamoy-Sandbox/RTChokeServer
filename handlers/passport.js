module.exports = function(app){


    var User = require('../models/user.js');
    var passport = require('passport');

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    require('./passport/googleapi.js')(app, passport, User);
    require('./passport/facebook.js')(app, passport, User);
    require('./passport/twitter.js')(app, passport, User);
    require('./passport/local.js')(app, passport, User);

};
