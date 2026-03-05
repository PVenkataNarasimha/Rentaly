const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getProfile, updateProfile } = require('../controllers/profile.controller');

// GET profile
router.get('/', auth, getProfile);

// UPDATE profile
router.put('/', auth, updateProfile);

module.exports = router;
