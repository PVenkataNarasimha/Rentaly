import React, { useState } from 'react';
import './QuickBooking.css';
import MyRecentBookings from './MyRecentBookings';

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface QuickBookingProps {
  vehicles: Car[];
}

const QuickBooking: React.FC<QuickBookingProps> = ({ vehicles }) => {
  const [vehicleId, setVehicleId] = useState<number | ''>('');
  const [form, setForm] = useState({
    pickUpLocation: 'New York',
    dropOffLocation: 'New York',
    pickUpDate: '',
    pickUpTime: '00:00',
    returnDate: '',
    returnTime: '00:00',
    name: '',
    email: '',
    phone: '',
    request: '',
  });

  const selectedVehicle = vehicles.find(v => v.id === vehicleId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleId) {
      alert('Please select a vehicle');
      return;
    }

    const bookingPayload = {
      vehicleType: selectedVehicle?.name,
      ...form,
    };

    try {
      const res = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        credentials: 'include', // 🔥 cookie auth
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        alert('Booking failed');
        return;
      }

      alert('Booking confirmed!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="quick-booking-page">
    <div className="quick-booking-container">
      <form className="quick-booking-card" onSubmit={handleSubmit}>
        {/* LEFT */}
        <div className="left">
          <h3>Booking a Car</h3>

          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(Number(e.target.value))}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map(car => (
              <option key={car.id} value={car.id}>
                {car.name} - ${car.price}
              </option>
            ))}
          </select>

          <div className="row">
            <input
              name="pickUpLocation"
              value={form.pickUpLocation}
              onChange={handleChange}
              placeholder="Pick Up Location"
            />
            <input
              name="dropOffLocation"
              value={form.dropOffLocation}
              onChange={handleChange}
              placeholder="Destination"
            />
          </div>

          <div className="row">
            <input type="date" name="pickUpDate" onChange={handleChange} />
            <input type="time" name="pickUpTime" onChange={handleChange} />
          </div>

          <div className="row">
            <input type="date" name="returnDate" onChange={handleChange} />
            <input type="time" name="returnTime" onChange={handleChange} />
          </div>

          <button type="submit">Submit</button>
        </div>

        {/* RIGHT */}
        <div className="right">
          <h3>Enter Your Details</h3>

          <input name="name" placeholder="Your Name" onChange={handleChange} />
          <input name="email" placeholder="Your Email" onChange={handleChange} />
          <input name="phone" placeholder="Your Phone" onChange={handleChange} />
          <textarea
            name="request"
            placeholder="Do you have any request?"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
    <MyRecentBookings/>    
    </div>

  );
};

export default QuickBooking;
