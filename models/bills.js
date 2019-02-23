const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    bill: {
        type: String
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;