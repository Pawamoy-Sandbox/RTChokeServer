'use strict';

module.exports = function(server){

    server.get('/map', function(req, res){
        res.render('map');
    });
};
