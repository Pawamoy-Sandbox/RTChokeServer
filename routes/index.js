module.exports = function(app){
    var helpers = require('../lib/helpers.js');

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/index', helpers.ensureAuthenticated, function(req, res){
        res.render('index');
    });

    app.get('/help', function(req, res){
        res.render('help');
    });
};