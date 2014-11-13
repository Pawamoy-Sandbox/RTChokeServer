var express = require('express');

var app = express();

var credentials = require('./credentials.js');

var googleapi = require('googleapis');
var oauth2 = google.auth.oauth2;

var oauth2Client = new OAuth2(credentials.oauth2.googleapi.clientID,
                              credentials.oauth2.googleapi.clientSecret,
                              credentials.oauth2.googleapi.redirectURI);


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


//----------------------------------------------------------------------------------
// basic routes for website pages
//----------------------------------------------------------------------------------
app.get('/', function(req, res){
    res.render('index');
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

app.get('/oauth2', function(req, res){
    res.render('oauth2');
});

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
