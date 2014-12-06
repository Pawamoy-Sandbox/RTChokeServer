var express         = require('express');

var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app             = express();
var credentials     = require('./handlers/credentials.js');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// we start to listen to port 3000
app.set('port', process.env.PORT || 3000);

// using url redirect for static resources (/public)
app.use(express.static(__dirname + '/public'));

// use only test for dev
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

require('./handlers/mongoose.js')(app);
require('./handlers/kurento.js')(app);
require('./handlers/route.js')(app);
require('./handlers/handlebars.js')(app);

//----------------------------------------------------------------------------------
app.listen(app.get('port'), function(){
    console.log('RTChokeServer (' + app.get('env') +
                ') started on port ' + app.get('port'));
});
