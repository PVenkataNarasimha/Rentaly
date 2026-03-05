const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax'
  });

  res.json({ message: 'Login success' });
});

// VERIFY
router.get('/verify', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

module.exports = router;
