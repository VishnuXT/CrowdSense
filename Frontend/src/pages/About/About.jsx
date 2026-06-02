import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./About.css";
import heroImg from "../../assets/images/hero.png";

function About() {
  return (
    <div className="abt-page">
      <div className="abt-layout">
        
        <div className="abt-left-content">
          <div className="abt-tag-wrapper">
            <div className="abt-line"></div>
            <span className="abt-tag">ABOUT US</span>
          </div>

          <h1 className="abt-title">Know Before<br/>You Go</h1>

          <p className="abt-desc">
            CrowdSense is a smart crowd monitoring platform that helps users discover less crowded places before they travel. By combining crowd density data, traffic updates, weather information, and local events, CrowdSense enables safer and more convenient travel experiences.
          </p>

          <p className="abt-desc">
            Our mission is to help people save time, avoid congestion, and make informed travel decisions through intelligent location analytics.
          </p>
        </div>

        <div className="abt-right-image">
          <img src={heroImg} alt="Lighthouse View" />
        </div>
      </div>

      <div className="abt-footer">
        <Link to="/admin/login" className="abt-admin-link">
          <FaLock /> Login as Admin
        </Link>
      </div>
    </div>
  );
}

export default About;