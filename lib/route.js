'use strict';

module.exports = function(app){

    var flash = require('connect-flash');
    //var mongoose = require('./mongoose.js');

    app.disable('etag');

    require('./passport.js')(app);
    require('./route_api.js')(app);

    //require('../routes/index.js')(app);
    //require('../routes/stream.js')(app);
    require('../routes/map.js')(app);
    require('../routes/auth.js')(app);
    require('../routes/user.js')(app);

    //----------------------------------------------------------------------------------
    // we redirect the HTTP requests
    //----------------------------------------------------------------------------------
    app.use(function(req, res, next){
        res.status(404);
        res.render('errors/404');
    });


    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('errors/500');
    });

};
