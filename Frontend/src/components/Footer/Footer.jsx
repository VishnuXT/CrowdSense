import "./Footer.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDirectionsCar, MdPeopleAlt, MdWbSunny } from "react-icons/md";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Crowd<span>Sense</span>
          </Link>
          <p className="footer-tagline">Know Before You Go.</p>
          <p className="footer-description">
            Empowering safer, smarter, and hassle-free travel with crowd,
            traffic, and weather insights.
          </p>

          <div className="footer-feature-row">
            <span><MdPeopleAlt /> Crowd</span>
            <span><MdDirectionsCar /> Traffic</span>
            <span><MdWbSunny /> Weather</span>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/locations">Locations</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/admin/login">Admin Portal</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>
            <FaEnvelope />
            support@crowdsense.app
          </p>
          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>
          <p>
            <FaMapMarkerAlt />
            Thiruvananthapuram, Kerala
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CrowdSense. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
