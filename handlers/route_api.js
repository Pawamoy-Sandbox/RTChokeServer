module.exports = function(app){

    var User = require('../models/user.js');
    var Stream = require('../models/stream.js');

    app.get('/api_setUserCoordinate/', function(req, res) {
      
        var lat = req.body.latitude;   
        var lon = req.body.longitude;
        var timestamp = new Date(value);
        
        Stream.findOne({'_id_':req.params.userId}, function (err,user) {
            // if there are any errors, return the error
            if (err){
                console.log(" Error: User not find !")
                return done(err);
            }

            // if a user is valid and  streaming
            if ( user && (user.isStreaming == true) ) {
                
                //Check if stream exist
                if ( Stream.count({'_id_':user.currentStream._id_}) != 1 ){
                  user.currentStream.data.ride.push( {'latitude' : lat, 
                                                      'longitude': lon,
                                                      'timestamp': timestamp} )
                  user.currentStream.save();
                  return done(user);
                }
            }
            else {
              console.log(" Error: User current stream not defined !")
              return;
            }
        });
    });
    

    app.get('/api_launchStream/:userId', function(req, res) {
        User.findOne({'_id': req.params.userId}, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if a user is valid, he is now streaming
            if (user) {
                
                //Test if the user is currently streaming
                if ( user.isStreaming == true ){
                  console.log("Error: User is currently streaming !")
                  return ;
                }

                var newUserStream = new Stream( { 'created' : new Date(value),
                                                  'user' : user,
                                                  'is_public': false,
                                                }
                );
                
                user.isStreaming = true;
                user.save();
                user.currentStream = newUserStream;
                return done(user);
            }
        });
    });
};
