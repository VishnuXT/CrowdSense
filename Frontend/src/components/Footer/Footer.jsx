import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>
            Crowd<span>Sense</span>
          </h2>
          <p>Know Before You Go.</p>
          <p>Empowering safer, smarter, and hassle-free travel.</p>
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
          <p>Email: support@crowdsense.app</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CrowdSense. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
