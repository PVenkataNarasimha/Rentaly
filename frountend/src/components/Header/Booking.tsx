import { useLocation, useNavigate } from 'react-router-dom'
import './Booking.css'

const Booking: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    vehicleType,
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    pickUpTime,
    returnDate,
    returnTime,
  } = location.state || {}

  const handleConfirmBooking = async () => {
    if (!location.state) return

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        credentials: 'include', // ✅ SEND COOKIE
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location.state),
      })

      if (response.status === 401 || response.status === 403) {
        alert('Your session has expired. Please log in again.')
        navigate('/login')
        return
      }

      if (!response.ok) {
        throw new Error('Booking failed')
      }

      await response.json()
      alert('Your booking has been confirmed!')
      navigate('/')
    } catch (error) {
      console.error('Error confirming booking:', error)
      alert('There was an error confirming your booking. Please try again.')
    }
  }

  if (!location.state) {
    return (
      <div className="booking-page">
        <div className="booking-summary-container">
          <h1>Booking Details</h1>
          <p>
            No booking information provided. Please go back and fill the booking
            form.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="booking-summary-container">
        <h1>Your Booking Summary</h1>

        <div className="booking-summary">
          <p><strong>Vehicle Type:</strong> {vehicleType}</p>
          <p><strong>Pick Up Location:</strong> {pickUpLocation}</p>
          <p><strong>Drop Off Location:</strong> {dropOffLocation}</p>
          <p>
            <strong>Pick Up:</strong> {pickUpDate} at {pickUpTime}
          </p>
          <p>
            <strong>Return:</strong> {returnDate} at {returnTime}
          </p>
        </div>

        <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

export default Booking
