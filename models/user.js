var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String,
    displayName: String,
    pictureUrl: String,
    description: String,
    oauth2: Boolean,
});

var findOrCreate = require('mongoose-findorcreate');
userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);
module.exports = User;
