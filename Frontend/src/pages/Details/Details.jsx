import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { MdPeopleAlt, MdDirectionsCar, MdWbSunny, MdAccessTime, MdInfo } from "react-icons/md";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const locations = {
    1: {
      name: "Kovalam Beach",
      category: "Beach",
      location: "Kovalam, Thiruvananthapuram, Kerala 695527",
      description: "A world-famous beach known for its three adjacent crescent beaches. It's a popular destination for tourists offering beautiful sunsets and various water sports.",
      crowdScore: "72",
      crowdMax: "/ 100",
      crowdLevel: "Medium Crowd",
      crowdDesc: "The place is moderately crowded right now. You can expect some wait times at popular spots.",
      traffic: "Low",
      trafficLevel: "Smooth Traffic",
      trafficDesc: "Minimal traffic on approaching roads. Estimated travel time is normal.",
      weather: "30°C",
      weatherLevel: "Partly Cloudy",
      bestTimeTitle: "Evening",
      bestTime: "04:00 PM - 08:00 PM",
      area: "2.5 sq km",
      locality: "Kovalam",
      popularity: "High",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    },
    // add fallback
  };

  const place = locations[id] || locations[1]; // fallback to Kovalam

  return (
    <div className="det-page">
      <div className="det-container">
        
        <button className="det-back-btn" onClick={() => navigate("/locations")}>
          <FaArrowLeft /> Back to Places
        </button>

        {/* Hero Section */}
        <div className="det-hero">
          <div className="det-hero-info">
            <h1>{place.name}</h1>
            <div className="det-tags">
              <span className="det-category-tag">{place.category}</span>
              <span className="det-location-text">
                <FaMapMarkerAlt /> {place.location}
              </span>
            </div>
            <p className="det-description">{place.description}</p>
          </div>
          <div className="det-hero-img-wrapper">
            <img src={place.image} alt={place.name} className="det-hero-img" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="det-stats-grid">
          {/* Crowd */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg blue-bg">
                <MdPeopleAlt className="text-blue" />
              </div>
              <div className="det-stat-value">
                <span className="value-lg">{place.crowdScore}</span>
                <span className="value-sm">{place.crowdMax}</span>
              </div>
            </div>
            <div className="det-stat-badge badge-yellow">{place.crowdLevel}</div>
            <p className="det-stat-desc">{place.crowdDesc}</p>
          </div>

          {/* Traffic */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg green-bg">
                <MdDirectionsCar className="text-green" />
              </div>
              <div className="det-stat-value">
                <span className="value-lg">{place.traffic}</span>
              </div>
            </div>
            <div className="det-stat-badge badge-green">{place.trafficLevel}</div>
            <p className="det-stat-desc">{place.trafficDesc}</p>
          </div>

          {/* Weather */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg purple-bg">
                <MdWbSunny className="text-purple" />
              </div>
              <div className="det-stat-value">
                <span className="value-lg">{place.weather}</span>
              </div>
            </div>
            <div className="det-stat-badge badge-purple">{place.weatherLevel}</div>
          </div>

          {/* Best Time */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg orange-bg">
                <MdAccessTime className="text-orange" />
              </div>
              <div className="det-stat-value">
                <span className="value-lg">{place.bestTimeTitle}</span>
              </div>
            </div>
            <div className="det-stat-badge badge-orange">{place.bestTime}</div>
          </div>
        </div>

        {/* Traffic Map */}
        <div className="det-section">
          <h2>Traffic Around This Location</h2>
          <div className="det-map-placeholder">
            {/* Using a placeholder map image since we don't have the real one */}
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200" alt="Map" />
          </div>
        </div>

        {/* About Location */}
        <div className="det-section">
          <h2>About Location</h2>
          <div className="det-about-grid">
            <div className="det-about-item">
              <span className="det-about-label">Area</span>
              <span className="det-about-value">{place.area}</span>
            </div>
            <div className="det-about-item">
              <span className="det-about-label">Locality</span>
              <span className="det-about-value">{place.locality}</span>
            </div>
            <div className="det-about-item">
              <span className="det-about-label">Category</span>
              <span className="det-about-value">{place.category}</span>
            </div>
            <div className="det-about-item">
              <span className="det-about-label">Popularity</span>
              <span className="det-about-value">{place.popularity}</span>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="det-section">
          <h2>You May Also Like</h2>
          <div className="det-related-grid">
            {[1, 2, 3].map((idx) => (
              <div className="det-related-card" key={idx}>
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500" alt="Related Place" />
                <div className="det-related-info">
                  <h3>Shanghumugham Beach</h3>
                  <div className="det-related-tags">
                    <span className="det-badge badge-green">Low Crowd</span>
                    <span className="det-distance">8.6 km away</span>
                  </div>
                  <Link to={`/locations/2`} className="det-related-link">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Footer */}
      <div className="det-sticky-footer">
        <MdInfo className="info-icon" />
        <span>Crowd status updates every 5 minutes based on real-time data and analytics.</span>
      </div>
    </div>
  );
}

export default Details;