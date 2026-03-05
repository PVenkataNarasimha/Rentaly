const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// GET profile
router.get('/', async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

// UPDATE profile (WITH PASSWORD)
router.put('/', async (req, res) => {
  const { username, email, language, hourFormat, password } = req.body;

  const updateData = {
    username,
    email,
    language,
    hourFormat,
  };

  // 🔥 ONLY UPDATE PASSWORD IF PROVIDED
  if (password && password.trim().length >= 6) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  await User.findByIdAndUpdate(req.userId, updateData);

  res.json({ message: 'Profile updated successfully' });
});

module.exports = router;
