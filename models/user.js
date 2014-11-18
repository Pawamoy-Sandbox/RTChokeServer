var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String,
    description: String,
    oauth2: Boolean,
});

var User = mongoose.model('User', userSchema);
module.exports = User;
