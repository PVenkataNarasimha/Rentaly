require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authenticateToken = require('./middleware/auth.middleware');

const authRoutes = require('./routes/auth.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const bookingRoutes = require('./routes/booking.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();
const port = 3001;

// 🔥 REQUIRED
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true,
  })
);

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes); // ✅ PUBLIC
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/profile', authenticateToken, profileRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
