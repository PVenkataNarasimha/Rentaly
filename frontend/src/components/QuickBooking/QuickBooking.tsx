import React, { useState } from 'react'
import './QuickBooking.css'
import MyRecentBookings from './MyRecentBookings'
import { useNavigate } from 'react-router-dom'

interface Car {
  _id: string
  id: string
  name: string
  price: number
}

interface Props {
  vehicles: Car[]
}

const QuickBooking: React.FC<Props> = ({ vehicles }) => {
  const navigate = useNavigate()

  const [vehicleId, setVehicleId] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [feedback, setFeedback] = useState<{
    message: string
    type: 'error' | 'success'
  } | null>(null)

  const [form, setForm] = useState({
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpDate: '',
    pickUpTime: '00:00',
    returnDate: '',
    returnTime: '00:00',
    name: '',
    email: '',
    phone: '',
    request: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleVehicleChange = (id: string) => {
    setVehicleId(id)
    const selected = vehicles.find(v => v._id === id || v.id === id)
    setVehicleType(selected?.name || '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!vehicleId) {
      return setFeedback({ message: 'Select vehicle', type: 'error' })
    }

    const pickup = new Date(`${form.pickUpDate}T${form.pickUpTime}`)
    const dropoff = new Date(`${form.returnDate}T${form.returnTime}`)

    if (dropoff <= pickup) {
      return setFeedback({
        message: 'Return must be after pickup',
        type: 'error',
      })
    }

    setIsSubmitting(true)
    setFeedback(null)

    const payload = {
      vehicleId,
      vehicleType,

      pickUpLocation: form.pickUpLocation,
      dropOffLocation: form.dropOffLocation,

      pickUpDate: form.pickUpDate,
      pickUpTime: form.pickUpTime,

      returnDate: form.returnDate,
      returnTime: form.returnTime,

      name: form.name,
      email: form.email,
      phone: form.phone,
      request: form.request,
    }

    try {
      const res = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.status === 401) {
        navigate('/login')
        return
      }

      const data = await res.json()

      if (!res.ok) {
        return setFeedback({ message: data.error, type: 'error' })
      }

      setFeedback({ message: 'Booking successful!', type: 'success' })

      setForm({
        pickUpLocation: '',
        dropOffLocation: '',
        pickUpDate: '',
        pickUpTime: '00:00',
        returnDate: '',
        returnTime: '00:00',
        name: '',
        email: '',
        phone: '',
        request: '',
      })

      setVehicleId('')
    } catch {
      setFeedback({ message: 'Server error', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="quick-booking-page">
      <form className="qb-form" onSubmit={handleSubmit}>
  <h3 className="qb-title">Book Your Car</h3>

  {feedback && (
    <p className={`qb-feedback ${feedback.type}`}>
      {feedback.message}
    </p>
  )}

  <select
    className="qb-input qb-select"
    value={vehicleId}
    onChange={e => handleVehicleChange(e.target.value)}
  >
    <option value="">Select Vehicle</option>
    {vehicles.map(car => (
      <option key={car._id} value={car._id}>
        {car.name} - ${car.price}
      </option>
    ))}
  </select>

  <div className="qb-row">
    <input
      className="qb-input"
      name="pickUpLocation"
      placeholder="Pickup Location"
      onChange={handleChange}
    />
    <input
      className="qb-input"
      name="dropOffLocation"
      placeholder="Drop Location"
      onChange={handleChange}
    />
  </div>

  <div className="qb-row">
    <input
      className="qb-input"
      type="date"
      name="pickUpDate"
      onChange={handleChange}
    />
    <input
      className="qb-input"
      type="time"
      name="pickUpTime"
      onChange={handleChange}
    />
  </div>

  <div className="qb-row">
    <input
      className="qb-input"
      type="date"
      name="returnDate"
      onChange={handleChange}
    />
    <input
      className="qb-input"
      type="time"
      name="returnTime"
      onChange={handleChange}
    />
  </div>

  <input
    className="qb-input"
    name="name"
    placeholder="Full Name"
    onChange={handleChange}
  />

  <input
    className="qb-input"
    name="email"
    placeholder="Email Address"
    onChange={handleChange}
  />

  <input
    className="qb-input"
    name="phone"
    placeholder="Phone Number"
    onChange={handleChange}
  />

  <textarea
    className="qb-input qb-textarea"
    name="request"
    placeholder="Any special request?"
    onChange={handleChange}
  />

  <button className="qb-button" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Book Now'}
  </button>
</form>

      <MyRecentBookings />
    </div>
  )
}

export default QuickBooking