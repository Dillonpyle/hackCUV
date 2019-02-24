const mongoose = require('mongoose');

const repSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  state: {type: String, required: true },
  party: {type: String, required: true },
  image: String,
});

module.exports = mongoose.model('Rep', repSchema);