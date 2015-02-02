'use strict';

module.exports = function(app, passport, User){

    var credentials = require('../credentials.js');
    var FacebookStrategy = require('passport-facebook').Strategy;
    
//    function handleError(status) {
//        res.status(status).send();
//    }
    
    passport.use(new FacebookStrategy({
        callbackURL: credentials.oauth2.facebook.redirectURI,
        clientID: credentials.oauth2.facebook.clientID,
        clientSecret: credentials.oauth2.facebook.clientSecret,
    },
    function(accessToken, refreshToken, profile, done) {
       console.log('profilename:' + profile.displayName);
        User.findOrCreate({ email: profile.emails[0] }, function (err, user){
            user.displayName = profile.displayName;
            user.pictureUrl = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg';
//            user.save(function(err){
//                if (err){
//                    return handleError(err);
//                }
//            });
            return done(err, user);
        });
    }));

    app.get('/auth/facebook',
            passport.authenticate('facebook')
           );

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/auth' }),
            function(req, res) {
                req.session.user = req.user;
                res.redirect('/index');
            });
};

