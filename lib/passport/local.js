module.exports = function(app, passport, User){

    var LocalStrategy   = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser            = new User();

                    // set the user's local credentials
                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        console.log('authenticating %s:%s', email, password);
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, console.log('loginMessage', 'No user found.'));
            if (!user.validPassword(password))
                return done(null, false, console.log('loginMessage', 'Oops! Wrong password.'));

            req.session.user = user;

            return done(null, user);
        });

    }));

};
