const { ObjectId } = require('mongodb');
const { client } = require('../config/db');

const createBooking = async (req, res) => {
  try {
    const bookings = client.db('rentaly').collection('bookings');

    const booking = {
      ...req.body,
      userId: new ObjectId(req.user.userId),
      username: req.user.username,
      createdAt: new Date(),
    };

    const result = await bookings.insertOne(booking);
    res.status(201).json({ booking: { ...booking, _id: result.insertedId } });
  } catch {
    res.status(500).json({ error: 'Booking creation failed' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = client.db('rentaly').collection('bookings');
    const data = await bookings
      .find({ userId: new ObjectId(req.user.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

module.exports = { createBooking, getBookings };
