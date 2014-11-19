module.exports= function(app){

    var credentials = require('./credentials.js');

    var passport = require('passport')
        , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        callbackURL: credentials.oauth2.googleapi.redirectURI,
        clientID: credentials.oauth2.googleapi.clientID,
        clientSecret: credentials.oauth2.googleapi.clientSecret,
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profilename:' + profile.displayName);
        return done(null, profile);
    }));

    app.get('/auth/google',
            passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'})
           );

           app.get('/auth/google/callback',
                   passport.authenticate('google', { failureRedirect: '/auth' }),
                   function(req, res) {
                       // Successful authentication, redirect home.
                       res.redirect('../../');
                   });
};
