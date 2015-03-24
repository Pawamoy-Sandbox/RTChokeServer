'use strict';

var streamModel = require('../models/stream');

module.exports = function (server) {

    var model = new streamModel();

    server.get('/', function (req, res) {
        res.redirect('index');
    });

    server.get('/index', function (req, res) {
        res.render('index', model);
    });
};
