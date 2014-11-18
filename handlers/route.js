module.exports = function(app){

    var displayName = '';
    var urlPicture = '';

    var oauth2 = require('./oauth2.js');

    app.get('/', function(req, res){
        var locals = {
            displayName: displayName,
            urlPicture: urlPicture
        };

        res.render('index', locals);
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

    app.get('/oauth2', function(req, res){
        var authUrlGoogle = oa2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/plus.me'
        });

        res.render('oauth2', {authUrlGoogle: authUrlGoogle,
                   authUrlFacebook: '',
                   authUrlTwitter: ''});
    });

    app.get('/oauth2callback', function(req, res){
        var code = req.query.code;

        oa2Client.getToken(code, function(err, tokens){
            oa2Client.setCredentials(tokens);
            retrieveGooglePlusProfile();
        });
        var locals = {
            displayName: displayName,
            urlPicture: urlPicture
        };
        res.render('index', locals);
    });


    var retrieveGooglePlusProfile = function(){
        plus.people.get({ userId: 'me', auth: oa2Client }, function (err, profile){
            if (err){
                console.log('Error while fetching for google+ profile', err);
                return;
            }
            displayName = profile.displayName;
            urlPicture = profile.image.url;
        });
    };



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
