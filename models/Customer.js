const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Scheme
const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        default: false
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);