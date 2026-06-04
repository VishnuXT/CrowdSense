import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaUsers className="logo-icon" />
        <div className="logo-text">
          <h2>Crowd<span>Sense</span></h2>
          <p>Know Before You Go</p>
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
