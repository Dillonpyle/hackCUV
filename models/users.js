const mongoose = require('mongoose');
const Bill = require('./bills')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    trackedBills: [Bill.schema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;