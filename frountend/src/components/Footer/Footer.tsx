import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* TOP SECTION: 4 COLUMNS */}
        <div className="footer-content">
          
          {/* Column 1: About */}
          <div className="footer-column">
            <h3 className="footer-title">About Rentaly</h3>
            <p className="footer-text">
              Where quality meets affordability. We understand the importance of
              a smooth and enjoyable journey without the burden of excessive
              costs. That's why we have meticulously crafted our offerings to
              provide you with top-notch vehicles at minimum expense.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Info</h3>
            <ul className="contact-list">
              <li>
                <span className="icon-green">📍</span>
                <span>08 W 36th St, New York, NY 10001</span>
              </li>
              <li>
                <span className="icon-green">📞</span>
                <span>+1 333 9296</span>
              </li>
              <li>
                <span className="icon-green">✉️</span>
                <span>contact@example.com</span>
              </li>
              <li>
                <span className="icon-green">📄</span>
                <span className="download-link">Download Brochure</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News</a></li>
              <li><a href="#partners">Partners</a></li>
            </ul>
          </div>

          {/* Column 4: Social Network */}
          <div className="footer-column">
            <h3 className="footer-title">Social Network</h3>
            <div className="social-icons">
              <a href="#fb" className="social-btn"><FontAwesomeIcon icon={faFacebook} className='social-btn' /></a>
              <a href="#tw" className="social-btn"><FontAwesomeIcon icon={faTwitter} className='social-btn' /></a>
              <a href="#in" className="social-btn"><FontAwesomeIcon icon={faLinkedin} className='social-btn' /></a>
              <a href="#pi" className="social-btn"><FontAwesomeIcon icon={faPinterest} className='social-btn' /></a>
              <a href="#rss" className="social-btn"><FontAwesomeIcon icon={faInstagram} className='social-btn' /></a>
            </div>
          </div>
          
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <div className="copyright">
            Copyright 2025 - Rentaly by Designesia
          </div>
          <div className="legal-links">
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
