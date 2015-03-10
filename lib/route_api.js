'use strict';

/*global value */
/*global done */
/*global user */
module.exports = function(app){

    var User = require('../models/user.js');
    var Stream = require('../models/stream.js');
    var helpers = require('../lib/helpers.js');

    app.get('/api_setUserCoordinate/', helpers.ensureAuthenticated, function(req, res) {

        var lat = req.body.latitude;
        var lon = req.body.longitude;
        var timestamp = new Date(value);

        User.findOne({'_id_':req.params.userId}, function (err,user) {
            // if there are any errors, return the error
            if (err){
                console.log(" Error: User not find !");
                return done(err);
            }

            // if a user is valid and  streaming
            if ( user && (user.isStreaming === true) ) {

                //Check if stream exist
                if ( Stream.count({'_id_':user.currentStream._id_}) !== 1 ){
                  user.currentStream.data.ride.push( {'latitude' : lat,
                                                      'longitude': lon,
                                                      'timestamp': timestamp} );
                  user.currentStream.save();
                  return done(user);
                }
            }
            else {
              console.log(" Error: User current stream not defined !");
            }
        });
    });



    app.get('/api_launchStream', helpers.ensureAuthenticated, function(req, res) {
        if (res.locals.user.isStreaming === false) {
            res.locals.user.isStreaming = true;
        }
            // if a user is valid, he is now streaming
            if (user) {

                //Test if the user is currently streaming
                if ( user.isStreaming === true ){
                  console.log("Error: User is currently streaming !");
                  return ;
                }

                var newUserStream = new Stream( { 'created' : new Date(value),
                                                  'user' : user,
                                                  'is_public': false
                                                }
                );

                user.isStreaming = true;
                user.save();
                user.currentStream = newUserStream;
                return done(user);
            }
    });

    app.get('/api_stopStream', helpers.ensureAuthenticated, function(req, res) {
        if (res.locals.user.isStreaming === true) {
            res.locals.user.isStreaming = false;
            res.locals.user.currentStream.closed = new Date();
        }
    });


    app.get('/api_activeUserCoordinate', helpers.ensureAuthenticated, function(req, res) {
      var ActiveUserPosition = [];

      User.find({ isActive: true }, function(err, user){

        if (err){
          return console.error(err);
        }

        var lastPositionIndex = user.latestGpsPosition.length - 1;

        if(lastPositionIndex > 0){
          var userPosition = user.latestGpsPosition[ lastPositionIndex ];
          ActiveUserPosition.push( userPosition);
        }

      });
    });


    app.get('/api_streamingUserCoordinate', helpers.ensureAuthenticated, function(req, res) {
      var StreamingUserPosition = [];

      User.find({ isStreaming: true }, function(err, user){

        if (err){
          return console.error(err);
        }

        var lastPositionIndex = user.latestGpsPosition.length - 1;

        if(lastPositionIndex > 0){
          var userPosition = user.latestGpsPosition[ lastPositionIndex ];
          StreamingUserPosition.push( userPosition);
        }

      });
    });


    app.get('/api_usersCoordinate', helpers.ensureAuthenticated, function(req, res) {

      var AllUserPosition = [];

      User.find(function(err, user){

        if (err){
          return console.error(err);
        }

        var lastPositionIndex = user.latestGpsPosition.length - 1;

        if(lastPositionIndex > 0){
          var userPosition = user.latestGpsPosition[ lastPositionIndex ];
          AllUserPosition.push( userPosition);
        }

      });
    });

};
