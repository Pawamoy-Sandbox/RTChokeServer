
var credentials = require('./credentials.js');

var gapi = require('googleapis');
var OAuth2 = gapi.auth.OAuth2;

exports.oa2Client = new OAuth2(credentials.oauth2.googleapi.clientID, credentials.oauth2.googleapi.clientSecret, credentials.oauth2.googleapi.redirectURI);

exports.plus = gapi.plus('v1');

exports.retrieveGooglePlusProfile = function(){
    oauth2.plus.people.get({ userId: 'me', auth: oauth2.oa2Client }, function (err, profile){
        if (err){
            console.log('Error while fetching for google+ profile', err);
            return;
        }
        displayName = profile.displayName;
        urlPicture = profile.image.url;
    });
};
