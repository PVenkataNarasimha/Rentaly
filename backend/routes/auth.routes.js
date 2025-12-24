const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const { register, login, logout, verify } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authenticateToken, verify);

module.exports = router;
