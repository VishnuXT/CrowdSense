import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./About.css";
import heroImg from "../../assets/images/hero.png";

function About() {
  return (
    <div className="abt-page">
      <section
        className="abt-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="abt-overlay">
          <div className="abt-left-content">
            <div className="abt-tag-wrapper">
              <div className="abt-line"></div>
              <span className="abt-tag">ABOUT US</span>
            </div>

            <h1 className="abt-title">Know Before<br/>You Go</h1>

            <p className="abt-desc">
              CrowdSense helps you make smarter travel decisions by providing
              real-time information about crowd levels, traffic conditions,
              and weather updates at popular places in{" "}
              <span>Thiruvananthapuram.</span>
            </p>

            <p className="abt-desc">
              Our mission is to reduce congestion, improve travel experience
              and help you explore the city stress-free.
            </p>
          </div>
        </div>
      </section>

      <div className="abt-footer">
        <Link to="/admin/login" className="abt-admin-link">
          <FaLock /> Login as Admin
        </Link>
      </div>
    </div>
  );
}

export default About;
