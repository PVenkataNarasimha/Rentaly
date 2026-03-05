const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'en',
  },
  hourFormat: {
    type: String,
    default: '24h',
  }
});

module.exports = mongoose.model('User', userSchema);