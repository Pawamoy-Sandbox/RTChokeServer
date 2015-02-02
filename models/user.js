'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    displayName: String,
    pictureUrl: String,
    description: String,
    gender: String,
    oauth2: Boolean,
    isStreaming: Boolean,
    latestGpsPosition: Array
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var findOrCreate = require('mongoose-findorcreate');
userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);
module.exports = User;

