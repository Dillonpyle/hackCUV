const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  title: { type:String , required: true , unique: true },
  summary: String,
  state: {type:String, required: true},
  bill_id: { type:String , required: true , unique: true },
  proposed: Date,
  lastAction: Date,
  trackingCount: { type: Number, min: 0 }
});

module.exports = mongoose.model('Bill', BillSchema);