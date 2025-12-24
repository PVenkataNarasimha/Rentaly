import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faPinterest } from '@fortawesome/free-brands-svg-icons';
import './Topbar.css';

const Topbar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className='top-bar-icons'>
        <FontAwesomeIcon icon={faPhone} className='icons-i' />
        <span>+1 (234) 567-8901</span>
        <FontAwesomeIcon icon={faEnvelope} className='icons-i' />
        <span>contact@example.com</span>
        <FontAwesomeIcon icon={faClock} className='icons-i' />
        <span>Mon - Fri: 9:00 - 18:00</span>
      </div>
      <div className='top-bar-links'>
        <a href="#"><FontAwesomeIcon icon={faFacebook} className='icons-iw' /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} className='icons-iw' /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} className='icons-iw' /></a>
        <a href="#"><FontAwesomeIcon icon={faLinkedin} className='icons-iw' /></a>
        <a href="#"><FontAwesomeIcon icon={faPinterest} className='icons-iw' /></a>
      </div>
    </div>
  );
};

export default Topbar;
