import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUmbrellaBeach, FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown, MdPeopleAlt, MdDirectionsCar, MdWbSunny } from "react-icons/md";
import "./Home.css";
import heroImg from "../../assets/images/hero.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div 
        className="home-hero-bg" 
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="home-overlay">
          
          <div className="home-content">
            
            {/* Left Card */}
            <div className="home-search-card">
              <h2>Find Less Crowded Places</h2>
              <p>Select your city and explore crowd status before you visit any place.</p>

              <div className="home-form-group">
                <label>Select City</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon text-blue" />
                  <select>
                    <option>Thiruvananthapuram</option>
                  </select>
                  <MdKeyboardArrowDown className="select-arrow" />
                </div>
              </div>

              <div className="home-form-group">
                <label>Select Category</label>
                <div className="input-with-icon">
                  <FaUmbrellaBeach className="input-icon text-green" />
                  <select>
                    <option>Beaches</option>
                  </select>
                  <MdKeyboardArrowDown className="select-arrow" />
                </div>
              </div>

              <button 
                className="home-explore-btn"
                onClick={() => navigate("/locations")}
              >
                <FaSearch className="btn-icon" />
                Explore Locations
              </button>

              <div className="home-info-box">
                <div className="info-icon-wrapper">
                  <MdPeopleAlt className="info-icon text-blue" />
                </div>
                <p>Check real-time crowd status, traffic and weather before you go.</p>
              </div>
            </div>

            {/* Right Text */}
            <div className="home-right-text">
              <h1>Know Before<br/>You Go</h1>
              <p>
                Check crowd conditions, traffic congestion and weather updates before visiting public places in <span>Thiruvananthapuram</span>.
              </p>
            </div>

          </div>

          {/* Floating Strip */}
          <div className="home-status-strip">
            <div className="status-item">
              <div className="status-icon-bg green-bg">
                <MdPeopleAlt className="status-icon text-green" />
              </div>
              <div className="status-text">
                <h4>Crowd Status</h4>
                <p>Real-time</p>
              </div>
            </div>
            
            <div className="status-divider"></div>

            <div className="status-item">
              <div className="status-icon-bg yellow-bg">
                <MdDirectionsCar className="status-icon text-yellow" />
              </div>
              <div className="status-text">
                <h4>Traffic Updates</h4>
                <p>Live</p>
              </div>
            </div>

            <div className="status-divider"></div>

            <div className="status-item">
              <div className="status-icon-bg blue-bg">
                <MdWbSunny className="status-icon text-blue" />
              </div>
              <div className="status-text">
                <h4>Weather</h4>
                <p>Updated</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
