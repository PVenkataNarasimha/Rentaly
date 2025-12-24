import { useEffect, useState } from 'react';
import './MyRecentBookings.css';

interface Booking {
  _id: string;
  vehicleType: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  returnDate: string;
  status?: 'completed' | 'cancelled' | 'scheduled';
}

const MyRecentBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/bookings', {
          credentials: 'include', // ✅ cookie auth
        });

        if (!res.ok) return;

        const data = await res.json();

        // OPTIONAL: default status if not present
        const mapped = data.map((b: Booking) => ({
          ...b,
          status: b.status || 'scheduled',
        }));

        setBookings(mapped);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="recent-orders">
      <h3>My Recent Orders</h3>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Car Name</th>
            <th>Pick Up Location</th>
            <th>Drop Off Location</th>
            <th>Pick Up Date</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="order-id">#{booking._id.slice(-5)}</td>
              <td className="car-name">{booking.vehicleType}</td>
              <td>{booking.pickUpLocation}</td>
              <td>{booking.dropOffLocation}</td>
              <td>{new Date(booking.pickUpDate).toLocaleDateString()}</td>
              <td>{new Date(booking.returnDate).toLocaleDateString()}</td>
              <td>
                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecentBookings;
