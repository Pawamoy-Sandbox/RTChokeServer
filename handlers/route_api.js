module.exports = function(app){

    var User = require('../models/user.js');

    app.get('/api_launchStream/:userId', function(req, res) {
        User.findOne({'_id': req.params.userId}, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if a user is valid, he is now streaming
            if (user) {
                user.isStreaming = true;
                return done(user);
            }
        });
    });
};