'use strict';

module.exports = function(app, passport, User){

    var credentials = require('../credentials.js');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//    function handleError(status) {
//        res.status(status).send();
//    }

    passport.use(new GoogleStrategy({
        callbackURL: credentials.oauth2.googleapi.redirectURI,
        clientID: credentials.oauth2.googleapi.clientID,
        clientSecret: credentials.oauth2.googleapi.clientSecret,
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profilename:' + profile.displayName);
        User.findOrCreate({ email: profile.emails[0] }, function (err, user){
            user.displayName = profile.displayName;
            user.pictureUrl = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg';
            user.email = profile.emails[0];
//            user.save(function(err){
//                if (err){
//                    return handleError(err);
//                }
//            });
            return done(err, user);
        });
    }));

    app.get('/auth/google',
            passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'})
           );

    app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/auth' }),
            function(req, res) {
                req.session.user = req.user;
                res.redirect('/index');
            });
};
