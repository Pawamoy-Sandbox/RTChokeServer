'use strict';

var streamModel = require('../models/stream');

module.exports = function (router) {

    var model = new streamModel();

    router.get('/', function (req, res) {
        res.render('index', model);
    });

};
