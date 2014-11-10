var express = require('express');

var app = express();

// view engine
// we will be using Handlebars
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
    res.locals.showTests = app.get('env') !== 'production'
        && req.query.test === '1';
    next();
});


// basic routes for website pages
app.get('/', function(req, res){
    res.render('index');
});

app.get('/viewstream', function(req, res){
    res.render('viewstream');
});

app.get('/stream', function(req, res){
    res.render('stream');
});


// we redirect the HTTP requests
app.use(function(req, res){
    res.status(404);
    res.render('404');
});


app.use(function(req, res){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
    console.log('RTChokeServer started on port' + app.get('port'));
});
