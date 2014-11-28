module.exports = function(app){


    var User = require('../models/user.js');
    var passport = require('passport');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        User.findById(user.id, function(err, user) {
            done(err, user);
        });
    });


    require('./passport/googleapi.js')(app, passport, User);
    require('./passport/facebook.js')(app, passport, User);

};
