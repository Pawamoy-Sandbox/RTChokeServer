'use strict';

module.exports = function (server) {

    var helpers = require('../../lib/helpers.js');

    server.get('/', helpers.ensureAuthenticated, function (req, res) {
        res.render('stream');
    });
};
