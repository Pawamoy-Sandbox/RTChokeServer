module.exports = function(app){
    var User = require('../models/user.js');

    app.get('/profile', function(req, res){
        res.render('profile');
    });

    app.get('/setting', function(req, res){
        res.render('setting');
    });

    app.get('/user/profile/:userId', function(req, res, done){
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
