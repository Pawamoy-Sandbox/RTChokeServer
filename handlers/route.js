module.exports = function(app){

	var passport = require('passport');
	var flash = require('connect-flash');
	
    require('./passport.js')(app);

    app.get('/', function(req, res){
        res.render('index', {user: req.user});
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/auth');
    }

	
	app.use(flash()); 
	app.use(passport.initialize());
	app.use(passport.session());
	
    app.get('/index', ensureAuthenticated, function(req, res){
        res.render('index', {user: req.user});
    });

    app.get('/viewstream', function(req, res){
        res.render('viewstream');
    });

    app.get('/stream', function(req, res){
        res.render('stream');
    });

    app.get('/signup', function(req, res){
        res.render('signup');
    });

    app.get('/help', function(req, res){
        res.render('help');
    });

    app.get('/profile', function(req, res){
        res.render('profile');
    });

    app.get('/map', function(req, res){
        res.render('map');
    });

    app.get('/track', function(req, res){
        res.render('track.gpx');
    });

    app.get('/setting', function(req, res){
        res.render('setting');
    });

    app.get('/auth', function(req, res){
        res.render('auth');
    });

    app.post('/process', passport.authenticate('local-signup', {
	
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
		
	
    }));


    //----------------------------------------------------------------------------------
    // we redirect the HTTP requests
    //----------------------------------------------------------------------------------
    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });


    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });

};
