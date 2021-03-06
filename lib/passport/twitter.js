'use strict';

module.exports = function(app, passport, User){

    var credentials = require('../credentials.js');
    var TwitterStrategy = require('passport-twitter').Strategy;

//    function handleError(status) {
//        res.status(status).send();
//    }    
    
    passport.use(new TwitterStrategy({
        callbackURL: credentials.oauth2.twitter.redirectURI,
        consumerKey: credentials.oauth2.twitter.clientID,
        consumerSecret: credentials.oauth2.twitter.clientSecret,
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

    app.get('/auth/twitter',
            passport.authenticate('twitter')
           );

    app.get('/auth/twitter/callback',
            passport.authenticate('twitter', { failureRedirect: '/auth' }),
            function(req, res) {
                req.session.user = req.user;
                res.redirect('/index');
            });
};
