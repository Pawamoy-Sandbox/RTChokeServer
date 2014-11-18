var express = require('express');

var app = express();

var credentials = require('./credentials.js');

var gapi = require('googleapis');
var OAuth2 = gapi.auth.OAuth2;

var oa2Client = new OAuth2(credentials.oauth2.googleapi.clientID,
                          credentials.oauth2.googleapi.clientSecret,
                          credentials.oauth2.googleapi.redirectURI);

var plus = gapi.plus('v1');

//----------------------------------------------------------------------------------
// view engine
// we will be using Handlebars
//----------------------------------------------------------------------------------
var handlebars = require('express3-handlebars')
        .create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// we start to listen to port 3000
app.set('port', process.env.PORT || 3000);

// using url redirect for static resources (/public)
app.use(express.static(__dirname + '/public'));

// use only test for dev
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


//----------------------------------------------------------------------------------
// Database management (mongoose)
//----------------------------------------------------------------------------------
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1}
    }
};

switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown environment:' + app.get('env'));
}

var displayName = '';
var urlPicture = '';


//----------------------------------------------------------------------------------
// basic routes for website pages
//----------------------------------------------------------------------------------
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


//----------------------------------------------------------------------------------
app.listen(app.get('port'), function(){
    console.log('RTChokeServer (' + app.get('env') +
                ') started on port ' + app.get('port'));
});
