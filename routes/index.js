module.exports = function(app){
    var helpers = require('../lib/helpers.js');

    app.get('/help', function(req, res){
        res.render('help');
    });
};
