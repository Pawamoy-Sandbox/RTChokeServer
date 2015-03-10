'use strict';

module.exports = {

    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth');
    },

    putSessionIntoLocals: function(app) {
        app.use(function(req, res, next) {
            res.locals.user = req.session.user;
            next();
        });
    },

    coinFlip: function() {
        return (Math.floor(Math.random() * 2) === 0);
    },

    randomGender: function() {
        if (this.coinFlip()) {
            return 'man';
        }
        else {
            return 'woman';
        }
    },

    randomState: function(){
        var state = {'streaming': false,
                     'active': false};
        if (this.coinFlip()) {
            state.active = true;
            if (this.coinFlip()) {
                state.streaming = true;
            }
        }

        return state;
    },

    generateRandomPath: function(forStream) {
        var faker = require('./faker');
        var i, point;
        if (forStream) {
            var richPath = {
                url: faker.lorem.words(),
                ride: []
            };

            var timestamp = 0;

            for (i = 0; i < 30; i++) {
                point = {
                    "latitude": faker.address.latitude(),
                    "longitude": faker.address.longitude(),
                    "timestamp": timestamp
                };
                richPath.ride.push(point);
                timestamp += 30;
            }
            return richPath;
        }
        else {
            var path = [];

            for (i = 0; i < 30; i++) {
                point = {
                    "latitude": faker.address.latitude(),
                    "longitude": faker.address.longitude()
                };
                path.push(point);
            }

            return path;
        }
    },

    populateMongoDB: function(){
        var User = require('../models/user.js');
        var Stream = require('../models/stream.js');
        var faker = require('./faker');

        var randomName = faker.name.findName(); // Rowan Nikolaus
        var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
        var randomCard = faker.helpers.createCard(); // random contact card containing many properties

        var i, state;
        for (i = 0; i < 50; i++) {
            state = this.randomState();
            var newUser = new User({
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
                displayName: faker.internet.userName(),
                pictureUrl: faker.image.avatar(),
                description: faker.lorem.paragraph(),
                gender: this.randomGender(),
                oauth2: false,
                isStreaming: state.streaming,
                latestGpsPosition: [],
                isActive: state.active
            });
        }

        for (i = 0; i < 50; i++) {
            state = this.randomState();
            var newStream = new Stream({
                id: faker.random.number(),
                name: faker.internet.userName(),
                description: faker.lorem.sentence(),
                created: faker.date.past(),
                closed: faker.date.recent(),
                last_alive: faker.date.recent(),
                video_filepath: faker.internet.domainName(),
                is_public: this.coinFlip(),
                keywords: ['TEST'],
                data: {
                    url: String,
                    ride: [{
                        latitude: String,
                        longitude: String,
                        timestamp: Date
                    }]
                }
            });
        }
    }
};
