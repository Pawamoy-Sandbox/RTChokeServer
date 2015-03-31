'use strict';

/*TODO: TEST AND DEBUG ALL THESE FEATURES*/

/*global value */
/*global done */
/*global user */
module.exports = function (app) {

    var User = require('../../models/user.js');
    var Stream = require('../../models/stream.js');
    var helpers = require('../../lib/helpers.js');

    /* Set the user coordinate */
    app.get('/setUserCoordinate', helpers.ensureAuthenticated, function (req, res) {

        var lat = req.body.latitude;
        var lon = req.body.longitude;
        var timestamp = new Date(value);

        User.findOne({'_id_': req.params.userId}, function (err, user) {
            //if there are any errors, return the error
            if (err) {
                console.log(" Error: User not find !");
                return done(err);
            }

            //if a user is valid and  streaming
            if (user && (user.isStreaming === true)) {

                //Check if stream exist
                if (Stream.count({'_id_': user.currentStream._id_}) !== 1) {
                    user.currentStream.data.ride.push({
                        'latitude': lat,
                        'longitude': lon,
                        'timestamp': timestamp
                    });
                    user.currentStream.save();
                    return done(user);
                }
            }
            else {
                console.log(" Error: User current stream not defined !");
            }
        });

    });


    /* Start the user's stream */
    app.get('/launchStream', helpers.ensureAuthenticated, function (req, res) {
        if (res.locals.user.isStreaming === false) {
            res.locals.user.isStreaming = true;
        }
        // if a user is valid, he is now streaming
        if (res.locals.user) {

            //Test if the user is currently streaming
            if (res.locals.user.isStreaming === true) {
                console.log("Error: User is currently streaming !");
                return;
            }

            var newUserStream = new Stream({
                    'user': res.locals.user,
                    'is_public': false
                }
            );

            res.locals.user.isStreaming = true;
            res.locals.user.currentStream = newUserStream;

            console.log(res.locals.user.currentStream);


            res.locals.user.save();

            return done(res.locals.user);
        }
    });

    /* Stop the user's stream */
    app.get('/stopStream', helpers.ensureAuthenticated, function (req, res) {
        if (res.locals.user.isStreaming === true) {
            res.locals.user.isStreaming = false;
            res.locals.user.currentStream.closed = new Date();
        }
    });


    /* Get the list of coordinate of every active user*/
    app.get('/activeUserCoordinate', helpers.ensureAuthenticated, function (req, res) {
        var ActiveUserPosition = [];

        User.find({isActive: true}, function (err, user) {

            if (err) {
                return console.error(err);
            }

            var lastPositionIndex = user.latestGpsPosition.length - 1;

            if (lastPositionIndex > 0) {
                var userPosition = user.latestGpsPosition[lastPositionIndex];
                ActiveUserPosition.push(userPosition);
            }

        });
        res.json(ActiveUserPosition);
    });


    /* Get the list of coordinate of every streaming user*/
    app.get('/streamingUserCoordinate', helpers.ensureAuthenticated, function (req, res) {
        var StreamingUserPosition = [];

        User.find({isStreaming: true}, function (err, user) {

            if (err) {
                return console.error(err);
            }

            var lastPositionIndex = user.latestGpsPosition.length - 1;

            if (lastPositionIndex > 0) {
                var userPosition = user.latestGpsPosition[lastPositionIndex];
                StreamingUserPosition.push(userPosition);
            }

        });
        res.json(StreamingUserPosition);
    });


    /* Get the list of the last known coordinate of every user*/
    app.get('/usersCoordinate', helpers.ensureAuthenticated, function (req, res) {

        var AllUserPosition = [];

        User.find(function (err, user) {

            if (err) {
                return console.error(err);
            }

            var lastPositionIndex = user.latestGpsPosition.length - 1;

            if (lastPositionIndex > 0) {
                var userPosition = user.latestGpsPosition[lastPositionIndex];
                AllUserPosition.push(userPosition);
            }

        });
        res.json(AllUserPosition);
    });

};
