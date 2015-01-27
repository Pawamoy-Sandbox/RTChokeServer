module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated())
        { return next(); }
        res.redirect('/auth');
    },

    putSessionIntoLocals: function(app){
        app.use(function(req, res, next){
            res.locals.user = req.session.user;
            next();
        });
    }
};