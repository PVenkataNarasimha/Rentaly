const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/booking.controller');

router.post('/', createBooking);
router.get('/', getBookings);

module.exports = router;
