import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Dashbord.css'

const API_BASE_URL = 'http://localhost:3001/api'

interface User {
  _id: string
  username: string
  email: string
}

interface Order {
  _id: string
  vehicleType: string
  pickUpLocation: string
  dropOffLocation: string
  pickUpDate: string
  returnDate: string
  username?: string
  status?: 'completed' | 'cancelled' | 'scheduled'
}

const StatCard = ({ title, value }: { title: string; value: number | string }) => (
  <div className="stat-card">
    <span>{value}</span>
    <p>{title}</p>
  </div>
)

const OrderRow = ({ order }: { order: Order }) => {
  const status = order.status || 'scheduled'
  return (
    <tr>
      <td>#{order._id.slice(-5)}</td>
      <td>{order.vehicleType}</td>
      <td>{order.pickUpLocation}</td>
      <td>{order.dropOffLocation}</td>
      <td>{new Date(order.pickUpDate).toDateString()}</td>
      <td>{new Date(order.returnDate).toDateString()}</td>
      <td>
        <span className={`status ${status}`}>{status}</span>
      </td>
    </tr>
  )
}

const Dashbord = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  /* ============================
     FETCH USER + ORDERS
  ============================ */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user profile and orders in parallel for better performance
        const [userRes, ordersRes] = await Promise.all([
          // Based on your backend structure, /api/profile should fetch the logged-in user's data
          fetch(`${API_BASE_URL}/profile`, { credentials: 'include' }),
          fetch(`${API_BASE_URL}/bookings`, { credentials: 'include' }),
        ])

        if (!userRes.ok) {
          throw new Error('Failed to fetch user profile. Please log in again.')
        }
        if (!ordersRes.ok) {
          throw new Error('Failed to fetch orders.')
        }

        const userData: User = await userRes.json()
        const ordersData: Order[] = await ordersRes.json()

        setUser(userData)
        setOrders(ordersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    navigate('/login')
  }

  /* ============================
     STATS
  ============================ */
  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length
  const scheduledOrders = orders.filter(o => o.status === 'scheduled').length

  const username = user?.username

  /* ============================
     UI STATES
  ============================ */
  if (loading) {
    return <p className="dashboard-loading">Loading dashboard...</p>
  }

  if (error) {
    return <p className="dashboard-error">{error}</p>
  }

  return (
    <div className="dashboard-page">
      {/* HERO */}
      <div className="dashboard-hero">
        <h1>Welcome, {username || 'User'}!</h1>
      </div>

      <div className="dashboard-container">
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="profile-card">
            <img
              src={
                'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt={`${username || 'User'}'s profile`}
              className="profile-img"
            />
            <h3>{username || 'User'}</h3>
            <p>{user?.email}</p>
          </div>

          <ul className="sidebar-menu">
            <li className="active">Dashboard</li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>My Favorite Cars</li>
            <li className="logout" onClick={handleLogout}>
              Sign Out
            </li>
          </ul>
        </aside>

        {/* MAIN */}
        <main className="dashboard-main">
          {/* STATS */}
          <div className="stats-grid">
            <StatCard title="Total Orders" value={totalOrders} />
            <StatCard title="Completed" value={completedOrders} />
            <StatCard title="Cancelled" value={cancelledOrders} />
            <StatCard title="Scheduled" value={scheduledOrders} />
          </div>

          {/* ORDERS TABLE */}
          <div className="orders-card">
            <h3>My Recent Orders</h3>

            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Car</th>
                  <th>Pick Up</th>
                  <th>Drop Off</th>
                  <th>Pick Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No orders found</td>
                  </tr>
                ) : (
                  orders.map(order => <OrderRow key={order._id} order={order} />)
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashbord
