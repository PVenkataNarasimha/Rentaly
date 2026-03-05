import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 45) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="main-header">
                <div className="logo">
                    <img src={scrolled ? "https://www.madebydesignesia.com/themes/rentaly/images/logo.png" : "https://www.madebydesignesia.com/themes/rentaly/images/logo-light.png"} alt="Company Logo" />
                </div>
                <div className='header-elements'>
                    <ul className="nav-links">
                        <li className="dropdown">
                            <Link to="/">Home <span className="arrow"></span></Link>
                        </li>
                        <li className="dropdown">
                            <a href="#">Cars <span className="arrow"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">Car List 1</a></li>
                                <li><a href="#">Car List 2</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#">Booking <span className="arrow"></span></a>
                            <ul className="dropdown-menu">
                                <Link to="/quickbooking"><li className='links'>Quick Booking</li></Link>
                                <Link to="/mybookings"><li className='links'>My Bookings</li></Link>
                                <Link to="/booking"><li className='links'>Booking</li></Link>
                            </ul>
                        </li>
                         <li className="dropdown">
                            <a href="#">News <span className="arrow"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">news Standard</a></li>
                                <li><a href="#">news Details</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#">My Account <span className="arrow"></span></a>
                            <ul className="dropdown-menu">
                                <Link to="/dashbord"><li className='links'>Dashbord</li></Link>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Bookings</a></li>
                                <li><a href="#">Invoices</a></li>
                                <li><a href="#">Settings</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Contact <span className="arrow"></span></a> 
                        </li>
                    </ul>
                </div>
                <div className="auth-links">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className='Sign_In'>Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className='Sign_In'>Login</Link>
                            <Link to="/register" className='Sign_In'>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
