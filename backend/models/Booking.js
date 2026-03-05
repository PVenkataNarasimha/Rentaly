const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },

    vehicleType: String,

    pickUpLocation: String,
    dropOffLocation: String,

    pickUpDate: String,
    pickUpTime: String,
    returnDate: String,
    returnTime: String,

    //  Hybrid (important)
    pickupDateTime: Date,
    dropoffDateTime: Date,

    name: String,
    email: String,
    phone: String,
    request: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)