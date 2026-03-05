require('dotenv').config(); // FIRST

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth.middleware');

const authRoutes = require('./routes/auth.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const profileRoutes = require('./routes/profile.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes); // PUBLIC
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
