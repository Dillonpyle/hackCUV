const mongoose = require('mongoose');
const Bill = require('./bills')
const Rep = require('./reps')

const userSchema = mongoose.Schema({
    username: { type:String , required: true , unique: true },
    password: { type:String , required: true },
    trackedBills: [Bill.schema],
    trackedReps: [Rep.schema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;