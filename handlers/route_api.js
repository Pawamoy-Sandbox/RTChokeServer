module.exports = function(app){

    var User = require('../models/user.js');

    var helpers = require('../utils/helpers.js');

    app.get('/api_launchStream', helpers.ensureAuthenticated, function(req, res) {
        res.locals.user.isStreaming = true;
    });
};