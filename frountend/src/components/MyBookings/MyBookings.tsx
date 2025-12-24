import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';

interface Booking {
  _id: string;
  vehicleType: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bookings', {
          method: 'GET',
          credentials: 'include', // 🔥 SEND COOKIE
        });

        if (response.status === 401 || response.status === 403) {
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || `Failed to fetch bookings (${response.status})`
          );
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="my-bookings-page">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-bookings-page">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <h2>{booking.vehicleType}</h2>

              <p><strong>From:</strong> {booking.pickUpLocation}</p>
              <p><strong>To:</strong> {booking.dropOffLocation}</p>

              <p>
                <strong>Pickup:</strong>{' '}
                {new Date(booking.pickUpDate).toLocaleDateString()} at{' '}
                {booking.pickUpTime}
              </p>

              <p>
                <strong>Return:</strong>{' '}
                {new Date(booking.returnDate).toLocaleDateString()} at{' '}
                {booking.returnTime}
              </p>

              <p className="booking-date">
                <em>
                  Booked on:{' '}
                  {new Date(booking.createdAt).toLocaleString()}
                </em>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
