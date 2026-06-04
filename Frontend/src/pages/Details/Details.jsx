import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import {
  MdAccessTime,
  MdDirectionsCar,
  MdInfo,
  MdPeopleAlt,
  MdWbSunny,
} from "react-icons/md";
import "./Details.css";
import heroImg from "../../assets/images/hero.png";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const locations = {
    1: {
      name: "Kovalam Beach",
      category: "Beach",
      location: "Kovalam, Thiruvananthapuram",
      description:
        "Famous for its scenic beauty, lighthouse and relaxing seashore. A popular destination for tourists and locals alike.",
      crowdScore: "72",
      crowdMax: "/100",
      crowdLevel: "Medium Crowd",
      crowdDesc: "The place is moderately crowded right now.",
      traffic: "Low",
      trafficLevel: "Smooth Traffic",
      trafficDesc: "Minimal traffic around this location.",
      weather: "30°C",
      weatherLevel: "Partly Cloudy",
      weatherDesc: "Feels like 33°C",
      bestTimeTitle: "Evening",
      bestTime: "04:00 PM - 08:00 PM",
      bestTimeDesc: "Crowd is usually lower during this time.",
      area: "Kovalam",
      locality: "Thiruvananthapuram",
      popularity: "High",
      image: heroImg,
    },
  };

  const place = locations[id] || locations[1];

  const relatedPlaces = [
    {
      id: 2,
      name: "Shanghumugham Beach",
      crowd: "Low Crowd",
      distance: "8.6 km away",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600",
    },
    {
      id: 3,
      name: "Veli Beach",
      crowd: "Medium Crowd",
      distance: "10.3 km away",
      image: "https://images.unsplash.com/photo-1596895111956-bf57b102b5e2?w=600",
    },
    {
      id: 4,
      name: "Akkulam Tourist Area",
      crowd: "Low Crowd",
      distance: "13.1 km away",
      image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28a?w=600",
    },
  ];

  return (
    <div className="det-page">
      <div className="det-container">
        <button className="det-back-btn" onClick={() => navigate("/locations")}>
          <FaArrowLeft /> Back to Places
        </button>

        <section className="det-hero">
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

          <img src={place.image} alt={place.name} className="det-hero-img" />
        </section>

        <section className="det-stats-grid">
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg blue-bg">
                <MdPeopleAlt className="text-blue" />
              </div>
              <div>
                <span className="det-stat-label">Crowd Status</span>
                <div className="det-stat-value">
                  <span className="value-lg">{place.crowdScore}</span>
                  <span className="value-sm">{place.crowdMax}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-yellow">{place.crowdLevel}</div>
            <p className="det-stat-desc">{place.crowdDesc}</p>
          </div>

          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg green-bg">
                <MdDirectionsCar className="text-green" />
              </div>
              <div>
                <span className="det-stat-label">Traffic Status</span>
                <div className="det-stat-value">
                  <span className="value-lg">{place.traffic}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-green">{place.trafficLevel}</div>
            <p className="det-stat-desc">{place.trafficDesc}</p>
          </div>

          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg purple-bg">
                <MdWbSunny className="text-purple" />
              </div>
              <div>
                <span className="det-stat-label">Weather</span>
                <div className="det-stat-value">
                  <span className="value-lg">{place.weather}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-purple">{place.weatherLevel}</div>
            <p className="det-stat-desc">{place.weatherDesc}</p>
          </div>

          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg orange-bg">
                <MdAccessTime className="text-orange" />
              </div>
              <div>
                <span className="det-stat-label">Best Time to Visit</span>
                <div className="det-stat-value">
                  <span className="value-lg">{place.bestTimeTitle}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-orange">{place.bestTime}</div>
            <p className="det-stat-desc">{place.bestTimeDesc}</p>
          </div>
        </section>

        <section className="det-section">
          <div className="det-section-header">
            <h2>Traffic Around This Location</h2>
            <div className="det-map-legend">
              <span><i className="legend-low"></i> Low</span>
              <span><i className="legend-medium"></i> Medium</span>
              <span><i className="legend-high"></i> High</span>
            </div>
          </div>

          <div className="det-map-placeholder">
            <div className="det-map-controls">
              <button>+</button>
              <button>-</button>
              <button><FiNavigation /></button>
            </div>
            <img
              src="https://staticmap.openstreetmap.de/staticmap.php?center=8.4003,76.9780&zoom=13&size=1200x360&markers=8.4003,76.9780,red-pushpin"
              alt="Traffic map around Kovalam Beach"
            />
            <div className="det-map-pin">
              <FaMapMarkerAlt />
              <span>Kovalam Beach</span>
            </div>
          </div>
        </section>

        <section className="det-section">
          <h2>About Location</h2>
          <div className="det-about-grid">
            <div className="det-about-item">
              <FiMapPin />
              <span className="det-about-label">Area</span>
              <span className="det-about-value">{place.area}</span>
            </div>
            <div className="det-about-item">
              <FaMapMarkerAlt />
              <span className="det-about-label">Locality</span>
              <span className="det-about-value">{place.locality}</span>
            </div>
            <div className="det-about-item">
              <MdWbSunny />
              <span className="det-about-label">Category</span>
              <span className="det-about-value">{place.category}</span>
            </div>
            <div className="det-about-item">
              <FiNavigation />
              <span className="det-about-label">Popularity</span>
              <span className="det-about-value">{place.popularity}</span>
            </div>
          </div>
        </section>

        <section className="det-section">
          <h2>You May Also Like</h2>
          <div className="det-related-grid">
            {relatedPlaces.map((item) => (
              <div className="det-related-card" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="det-related-info">
                  <h3>{item.name}</h3>
                  <div className="det-related-tags">
                    <span
                      className={`det-badge ${
                        item.crowd.includes("Medium") ? "badge-yellow" : "badge-green"
                      }`}
                    >
                      {item.crowd}
                    </span>
                    <span className="det-distance">
                      <FaRegClock /> {item.distance}
                    </span>
                  </div>
                  <Link to={`/locations/${item.id}`} className="det-related-link">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="det-sticky-footer">
        <MdInfo className="info-icon" />
        <span>Crowd status updates every 5 minutes based on real-time data and analytics.</span>
      </div>
    </div>
  );
}

export default Details;
