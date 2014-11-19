module.exports= function(app){

    var credentials = require('./credentials.js');

    var passport = require('passport')
        , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    passport.use(new GoogleStrategy({
        callbackURL: credentials.oauth2.googleapi.redirectURI,
        clientID: credentials.oauth2.googleapi.clientID,
        clientSecret: credentials.oauth2.googleapi.clientSecret,
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({googleId: profile.id}, function (err, user) {
            return done(err, user);
        });
    }));

    app.get('/auth/google',
            passport.authenticate('google'));

            app.get('/auth/google/callback',
                    passport.authenticate('google', { failureRedirect: '/login' }),
                    function(req, res) {
                        // Successful authentication, redirect home.
                        res.redirect('/');
                    });
};
