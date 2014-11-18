var credentials = require('./credentials.js');

var gapi = require('googleapis');
var OAuth2 = gapi.auth.OAuth2;

var oa2Client = new OAuth2(credentials.oauth2.googleapi.clientID,
                          credentials.oauth2.googleapi.clientSecret,
                          credentials.oauth2.googleapi.redirectURI);

var plus = gapi.plus('v1');


