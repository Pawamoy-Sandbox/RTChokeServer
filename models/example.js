var mongoose = require('mongoose');
//var Orders = require('./orders.js');

customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    salesNotes: [{
        date: Date,
        salespersonId: Number,
        notes: String,
    }],
});

//customerSchema.methods.getOrders = function(){
//    return Orders.find({ customerId: this._id });
//};

exports.Customer = mongoose.model('Customer', customerSchema);
