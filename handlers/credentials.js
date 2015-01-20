module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://rtchokeuser:rtchokeuser@rtchoke-dev.u-strasbg.fr:27017/rtchoke',
        },
        production: {
            connectionString: 'mongodb://rtchokeuser:rtchokeuser@rtchoke-dev.u-strasbg.fr:27017/rtchoke',
        },
    },

    oauth2: {
        googleapi: {
            clientID: '216484220053-5dcr6r7oij34rt6d6cbtgrfro3jn55n4.apps.googleusercontent.com',
            clientSecret: 'MDpv02iBy9zKwDR4mSbF9C-m',
            redirectURI: 'http://rtchoke-dev.u-strasbg.fr:3000/auth/google/callback',
        },
        facebook: {
            clientID: '1515926505330705',
            clientSecret: '8ee226f5a1753a22304f8441ae25ccf7',
            redirectURI: 'http://rtchoke-dev.u-strasbg.fr:3000/auth/facebook/callback',
        },
        twitter: {
            clientID: 'AVFlZ6KmiQ4lr9dKxnxkovQu4',
            clientSecret: 'Iy7lojeg1wTX9l9wseqHOtpGtnhaMKyfUX4jzmJbErWjpDAAR9',
            redirectURI: 'http://rtchoke-dev.u-strasbg.fr:3000/auth/twitter/callback',
        },


    },
};

