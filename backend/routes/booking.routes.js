const express = require('express')
const mongoose = require('mongoose')
const Booking = require('../models/Booking')

const router = express.Router()

/* GET BOOKINGS */
router.get('/', async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const bookings = await Booking.find({ userId: req.userId }).sort({
      createdAt: -1,
    })

    res.json(bookings)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

/* CREATE BOOKING */
router.post('/', async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const {
      vehicleId,
      vehicleType,
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      pickUpTime,
      returnDate,
      returnTime,
      name,
      email,
      phone,
      request,
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ error: 'Invalid vehicleId' })
    }

    // Validate using Date
    const pickup = new Date(`${pickUpDate}T${pickUpTime}`)
    const dropoff = new Date(`${returnDate}T${returnTime}`)

    if (dropoff <= pickup) {
      return res.status(400).json({ error: 'Invalid date range' })
    }

    const booking = new Booking({
      userId: req.userId,
      vehicleId,
      vehicleType,

      pickUpLocation,
      dropOffLocation,

      pickUpDate,
      pickUpTime,
      returnDate,
      returnTime,

      pickupDateTime: pickup,
      dropoffDateTime: dropoff,

      name,
      email,
      phone,
      request,
    })

    await booking.save()

    res.status(201).json({ message: 'Booking created' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router