var express         = require('express');

var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var logger          = require('morgan');
var credentials     = require('./handlers/credentials.js');

var app             = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({secret: credentials.sessionSecret,
                 saveUninitialized: true,
                 resave: true}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// we start to listen to port 3000
app.set('port', process.env.PORT || 3000);

// using url redirect for static resources (/public)
app.use(express.static(__dirname + '/public'));

// use only test for dev
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production';
    next();
});

require('./utils/helpers.js')(app);
require('./handlers/mongoose.js')(app);
require('./handlers/kurento.js')(app);
require('./handlers/route.js')(app);
require('./handlers/handlebars.js')(app);


//----------------------------------------------------------------------------------
app.listen(app.get('port'), function(){
    console.log('RTChokeServer (' + app.get('env') + ') started on port ' + app.get('port'));
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
