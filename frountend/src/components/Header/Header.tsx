import { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

// ✅ Import images correctly
import carImg from '../../Imgs/header-imgs/download.png'
import vanImg from '../../Imgs/header-imgs/van.png'
import minibusImg from '../../Imgs/header-imgs/minibus.png'
import sportscarImg from '../../Imgs/header-imgs/sportscar.png'

const Header: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<string>('Car')
  const [pickUpLocation, setPickUpLocation] = useState('')
  const [dropOffLocation, setDropOffLocation] = useState('')
  const [pickUpDate, setPickUpDate] = useState('')
  const [pickUpTime, setPickUpTime] = useState('Time')
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('Time')

  const navigate = useNavigate()

  const vehicles = [
    { name: 'Car', img: carImg },
    { name: 'Van', img: vanImg },
    { name: 'Minibus', img: minibusImg },
    { name: 'Prestige', img: sportscarImg },
  ]

  const handleFindVehicle = () => {
    if (
      !pickUpLocation ||
      !dropOffLocation ||
      !pickUpDate ||
      pickUpTime === 'Time' ||
      !returnDate ||
      returnTime === 'Time'
    ) {
      alert('Please fill in all fields.')
      return
    }
    navigate('/booking', {
      state: { vehicleType, pickUpLocation, dropOffLocation, pickUpDate, pickUpTime, returnDate, returnTime },
    })
  }

  return (
    <div className="header">
      <h1 className="header-title">
        Looking for a <span className="highlight">vehicle</span>? You're at the right place.
      </h1>
      <div className="booking-container">
        {/* VEHICLE SELECTION */}
        <div className="vehicle-selection">
          <h3>What is your vehicle type?</h3>
          <div className="vehicle-grid">
            {vehicles.map(vehicle => (
              <div
                key={vehicle.name}
                className={`vehicle-card ${
                  vehicleType === vehicle.name ? 'selected' : ''
                }`}
                onClick={() => setVehicleType(vehicle.name)}
              >
                <img src={vehicle.img} alt={vehicle.name} />
                <span>{vehicle.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="form-selection">
          <div className="form-row">
            <div className="form-group">
              <label>Pick Up Location</label>
              <input
                type="text"
                placeholder="Enter your pickup location"
                value={pickUpLocation}
                onChange={e => setPickUpLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Drop Off Location</label>
              <input
                type="text"
                placeholder="Enter your dropoff location"
                value={dropOffLocation}
                onChange={e => setDropOffLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pick Up Date & Time</label>
              <div className="datetime-input">
                <input
                  type="date"
                  value={pickUpDate}
                  onChange={e => setPickUpDate(e.target.value)}
                />
                <select value={pickUpTime} onChange={e => setPickUpTime(e.target.value)}>
                  <option>Time</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Return Date & Time</label>
              <div className="datetime-input">
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                />
                <select value={returnTime} onChange={e => setReturnTime(e.target.value)}>
                  <option>Time</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="find-btn" onClick={handleFindVehicle}>
              Find a Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* STEPS */}
      <section className="steps-section">
        <div className="steps-container">
          {[
            'Choose a vehicle',
            'Pick location & date',
            'Make a booking',
            'Sit back & relax',
          ].map((title, index) => (
            <div className="step-item" key={index}>
              <div className="step-number">{index + 1}</div>
              <h3>{title}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Comfortable, flexible, and reliable journey guaranteed.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[1, 2].map(i => (
            <div className="marquee-content" key={i}>
              <span className="category">Station Wagon</span>
              <span className="divider" />
              <span className="category">Truck</span>
              <span className="divider" />
              <span className="category">Minivans</span>
              <span className="divider" />
              <span className="category">Exotic Cars</span>
              <span className="divider" />
              <span className="category">SUV</span>
              <span className="divider" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
