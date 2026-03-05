import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'

const API_BASE_URL = 'http://localhost:3001/api'

interface ProfileData {
  username: string
  email: string
  language: string
  hourFormat: string
  avatar?: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileData>({
    username: '',
    email: '',
    language: 'English',
    hourFormat: '24-hour',
  })

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        credentials: 'include',
      })

      if (res.status === 401) {
        navigate('/login')
        return
      }

      const data = await res.json()
      setProfile(data)
      setLoading(false)
    }

    fetchProfile()
  }, [navigate])

  // 🔹 Update profile
  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...profile,
        password: password || undefined,
      }),
    })

    alert('Profile updated successfully')
    setPassword('')
    setConfirmPassword('')
  }

  // 🔹 Logout
  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    navigate('/login')
  }

  if (loading) return <p className="loading">Loading...</p>

  return (
    <div className="profile-page">
      {/* HERO */}
      <div className="profile-hero">
        <h1>My Profile</h1>
      </div>

      <div className="profile-container">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <img
              src={
                profile.avatar ||
                'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              className="profile-img"
            />
            <h3>{profile.username}</h3>
            <p>{profile.email}</p>
          </div>

          <ul className="sidebar-menu">
            <li><Link to="/dashbord">Dashboard</Link></li>
            <li className="active">My Profile</li>
            <li>My Favorite Cars</li>
            <li className="logout" onClick={handleLogout}>Sign Out</li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <section className="profile-content">
          <h3>Profile</h3>

          <div className="form-grid">
            <div>
              <label>Username</label>
              <input
                value={profile.username}
                onChange={e => setProfile({ ...profile, username: e.target.value })}
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div>
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Re-enter Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <label>Language</label>
              <select
                value={profile.language}
                onChange={e =>
                  setProfile({ ...profile, language: e.target.value })
                }
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
              </select>
            </div>

            <div>
              <label>Hour Format</label>
              <select
                value={profile.hourFormat}
                onChange={e =>
                  setProfile({ ...profile, hourFormat: e.target.value })
                }
              >
                <option>24-hour</option>
                <option>12-hour</option>
              </select>
            </div>
          </div>

          <button className="update-btn" onClick={handleUpdate}>
            Update profile
          </button>
        </section>
      </div>
    </div>
  )
}

export default Profile
