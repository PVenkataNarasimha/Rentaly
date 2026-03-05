const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    language: { type: String, default: 'English' },
    hourFormat: { type: String, default: '24-hour' },
    avatar: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
