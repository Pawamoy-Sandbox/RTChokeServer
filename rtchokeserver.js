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

// basic routes for website pages
app.get('/', function(req, res){
    res.render('home');
})


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