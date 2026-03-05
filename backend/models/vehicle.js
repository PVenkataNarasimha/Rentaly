const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  type: String,
  passengers: Number,
  luggage: Number
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
