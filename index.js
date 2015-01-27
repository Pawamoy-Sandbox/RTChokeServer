'use strict';

var express         = require('express');
var kraken          = require('kraken-js');

var bodyParser      = require('body-parser');
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var logger          = require('morgan');
var credentials     = require('./lib/credentials.js');
var controllers     = require('express-controller');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

controllers.setDirectory(__dirname + '/controllers').bind(app);
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

require('./lib/helpers.js')(app);
require('./lib/mongoose.js')(app);
require('./lib/kurento.js')(app);
require('./lib/route.js')(app);
//require('./lib/handlebars.js')(app);


//------------------------------------------------------------------------------
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
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
