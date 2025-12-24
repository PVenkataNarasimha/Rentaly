const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { client } = require('../config/db');

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const users = client.db('rentaly').collection('users');
  const exists = await users.findOne({ username });
  if (exists) return res.status(400).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ username, password: hashed });

  res.status(201).json({ message: 'Registered successfully' });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const users = client.db('rentaly').collection('users');
  const user = await users.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ message: 'Login successful' });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

const verify = (req, res) => {
  res.json({ authenticated: true, user: req.user });
};

module.exports = { register, login, logout, verify };
