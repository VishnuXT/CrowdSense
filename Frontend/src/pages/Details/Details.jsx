import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import {
  MdDirectionsCar,
  MdInfo,
  MdPeopleAlt,
  MdWbSunny,
} from "react-icons/md";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Details.css";
import heroImg from "../../assets/images/hero.png";
import {
  getLocationById,
  getCrowdScore,
  getTraffic,
  getWeather,
  getRecommendations,
  getCategoryById,
} from "../../services/api";

/* ───────── Helper Functions ───────── */

/** Returns the CSS badge class based on crowd status */
function getCrowdBadgeClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("low")) return "badge-green";
  if (s.includes("high") || s.includes("very")) return "badge-orange";
  return "badge-yellow"; // Medium / default
}

/** Returns the CSS badge class based on traffic congestion */
function getTrafficBadgeClass(congestion) {
  const c = (congestion || "").toLowerCase();
  if (c.includes("low") || c.includes("smooth") || c.includes("free")) return "badge-green";
  if (c.includes("high") || c.includes("heavy") || c.includes("severe")) return "badge-orange";
  return "badge-yellow"; // Medium / Moderate / default
}

/** Derive a human-friendly crowd description from the score */
function getCrowdDescription(score) {
  if (score == null) return "No crowd data available.";
  if (score <= 30) return "The place is not crowded right now.";
  if (score <= 60) return "The place is moderately crowded right now.";
  if (score <= 80) return "The place is quite crowded right now.";
  return "The place is very crowded right now.";
}

/** Suggest best time based on crowd score */
function getBestTime(score) {
  if (score == null) return { title: "—", time: "—", desc: "No data available." };
  if (score <= 40) return { title: "Anytime", time: "All Day", desc: "Crowd is usually low here." };
  if (score <= 70) return { title: "Evening", time: "04:00 PM – 08:00 PM", desc: "Crowd is usually lower during this time." };
  return { title: "Morning", time: "06:00 AM – 09:00 AM", desc: "Try visiting early to avoid the crowd." };
}

/* ───────── Component ───────── */

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [crowd, setCrowd] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [locRes, crowdRes, trafficRes, weatherRes, recsRes] =
          await Promise.all([
            getLocationById(id),
            getCrowdScore(id),
            getTraffic(id),
            getWeather(id),
            getRecommendations(id),
          ]);

        const locData = locRes.data;
        setLocation(locData);
        setCrowd(crowdRes.data);
        setTraffic(trafficRes.data);
        setWeather(weatherRes.data);
        setRecommendations(recsRes.data?.recommendations || []);

        // Resolve category name from category_id
        if (locData?.category_id) {
          try {
            const catRes = await getCategoryById(locData.category_id);
            setCategory(catRes.data);
          } catch {
            setCategory(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch location details:", err);
        setError("Failed to load location details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [id]);

  // Poll traffic every 30 seconds to get near-real-time updates
  useEffect(() => {
    let mounted = true;
    let timer = null;

    async function pollTraffic() {
      try {
        const res = await getTraffic(id);
        if (!mounted) return;
        setTraffic(res.data);
      } catch (err) {
        // ignore polling errors
      }
    }

    // start polling immediately
    pollTraffic();
    timer = setInterval(pollTraffic, 30000);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [id]);

  /* ── Loading State ── */
  if (loading) {
    return (
      <div className="det-page">
        <div className="det-container" style={{ textAlign: "center", paddingTop: "80px" }}>
          <div className="det-loading-spinner" />
          <p style={{ color: "#4b6386", fontWeight: 600, marginTop: 18 }}>
            Loading location details…
          </p>
        </div>
      </div>
    );
  }

  /* ── Error State ── */
  if (error || !location) {
    return (
      <div className="det-page">
        <div className="det-container" style={{ textAlign: "center", paddingTop: "80px" }}>
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 16 }}>
            {error || "Location not found."}
          </p>
          <button className="det-back-btn" style={{ margin: "20px auto" }} onClick={() => navigate("/locations")}>
            <FaArrowLeft /> Back to Places
          </button>
        </div>
      </div>
    );
  }

  /* ── Safe Data Extraction ── */
  const name = location?.name || "Unknown Location";
  const address = location?.address || "Address not available";
  const categoryName = category?.name || "General";
  const description = location?.description || "";
  const lat = location?.latitude;
  const lng = location?.longitude;
  const imageUrl = location?.image_url || heroImg;

  const crowdScore = crowd?.crowd_score ?? null;
  const crowdStatus = crowd?.crowd_status || "Unknown";
  const crowdDesc = getCrowdDescription(crowdScore);
  const crowdBadge = getCrowdBadgeClass(crowdStatus);

  const trafficCongestion = traffic?.congestion || "Unknown";
  const trafficStatus = traffic?.status || "No data";
  const travelTime = traffic?.travel_time || "—";
  const trafficBadge = getTrafficBadgeClass(trafficCongestion);

  const temp = weather?.temperature != null ? `${weather.temperature}°C` : "—";
  const weatherCondition = weather?.condition || "Unknown";
  const humidity = weather?.humidity != null ? `${weather.humidity}%` : "—";

  const bestTime = getBestTime(crowdScore);

  // Extract locality / area from address
  const addressParts = address.split(",").map((s) => s.trim());
  const area = addressParts[0] || "—";
  const locality = addressParts.length > 1 ? addressParts[addressParts.length - 1] : "—";

  const mapReady = lat && lng;

  return (
    <div className="det-page">
      <div className="det-container">
        <button className="det-back-btn" onClick={() => navigate("/locations")}>
          <FaArrowLeft /> Back to Places
        </button>

        {/* ── Hero Section ── */}
        <section className="det-hero">
          <div className="det-hero-info">
            <h1>{name}</h1>
            <div className="det-tags">
              <span className="det-category-tag">{categoryName}</span>
              <span className="det-location-text">
                <FaMapMarkerAlt /> {address}
              </span>
            </div>
            {description && <p className="det-description">{description}</p>}
          </div>

          <img src={imageUrl} alt={name} className="det-hero-img" />
        </section>

        {/* ── Stats Grid ── */}
        <section className="det-stats-grid">
          {/* Crowd Status */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg blue-bg">
                <MdPeopleAlt className="text-blue" />
              </div>
              <div>
                <span className="det-stat-label">Crowd Status</span>
                <div className="det-stat-value">
                  <span className="value-lg">{crowdScore ?? "—"}</span>
                  <span className="value-sm">/100</span>
                </div>
              </div>
            </div>
            <div className={`det-stat-badge ${crowdBadge}`}>{crowdStatus}</div>
            <p className="det-stat-desc">{crowdDesc}</p>
          </div>

          {/* Traffic Status */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg green-bg">
                <MdDirectionsCar className="text-green" />
              </div>
              <div>
                <span className="det-stat-label">Traffic Status</span>
                <div className="det-stat-value">
                  <span className="value-lg">{trafficCongestion}</span>
                </div>
              </div>
            </div>
            <div className={`det-stat-badge ${trafficBadge}`}>{trafficStatus}</div>
            <p className="det-stat-desc">Travel time: {travelTime}</p>
          </div>

          {/* Weather */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg purple-bg">
                <MdWbSunny className="text-purple" />
              </div>
              <div>
                <span className="det-stat-label">Weather</span>
                <div className="det-stat-value">
                  <span className="value-lg">{temp}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-purple">{weatherCondition}</div>
            <p className="det-stat-desc">Humidity: {humidity}</p>
          </div>

          {/* Category Insights — static card to fill the layout gap */}
          <div className="det-stat-card">
            <div className="det-stat-header">
              <div className="det-icon-bg blue-bg">
                <MdInfo className="text-blue" />
              </div>
              <div>
                <span className="det-stat-label">Category Insights</span>
                <div className="det-stat-value">
                  <span className="value-lg">{categoryName}</span>
                </div>
              </div>
            </div>
            <div className="det-stat-badge badge-yellow">Type: {category?.type || "—"}</div>
            <p className="det-stat-desc">Typical footfall: Moderate · Avg visit: 1–2 hrs</p>
          </div>
        </section>

        {/* ── Traffic Map ── */}
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
            </div>
            {mapReady ? (
              <MapContainer
                center={[lat, lng]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker
                  center={[lat, lng]}
                  pathOptions={{ color: trafficBadge === "badge-green" ? "#16a34a" : trafficBadge === "badge-orange" ? "#ea580c" : "#d97706", fillColor: "rgba(255,255,255,0.8)", fillOpacity: 0.9 }}
                  radius={12}
                >
                  <Popup>
                    <strong>{name}</strong>
                    <br />{trafficStatus}
                    <br />Travel time: {travelTime}
                  </Popup>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    {trafficCongestion}
                  </Tooltip>
                </CircleMarker>
              </MapContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#4b6386" }}>
                Map not available
              </div>
            )}
            <div className="det-map-pin">
              <FaMapMarkerAlt />
              <span>{name}</span>
              <div style={{ marginTop: 6 }}>
                <span className={`det-stat-badge ${getTrafficBadgeClass(trafficCongestion)}`}>
                  {trafficCongestion}
                </span>
                <span style={{ marginLeft: 8, fontSize: 11, color: '#4b6386', fontWeight:700 }}>
                  {travelTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── About Location ── */}
        <section className="det-section">
          <h2>About Location</h2>
          <div className="det-about-grid">
            <div className="det-about-item">
              <FiMapPin />
              <span className="det-about-label">Area</span>
              <span className="det-about-value">{area}</span>
            </div>
            <div className="det-about-item">
              <FaMapMarkerAlt />
              <span className="det-about-label">Locality</span>
              <span className="det-about-value">{locality}</span>
            </div>
            <div className="det-about-item">
              <MdWbSunny />
              <span className="det-about-label">Category</span>
              <span className="det-about-value">{categoryName}</span>
            </div>
            <div className="det-about-item">
              <FiNavigation />
              <span className="det-about-label">Crowd Level</span>
              <span className="det-about-value">{crowdStatus}</span>
            </div>
          </div>
        </section>

        {/* ── Recommendations ── */}
        {recommendations.length > 0 && (
          <section className="det-section">
            <h2>You May Also Like</h2>
            <div className="det-related-grid">
              {recommendations.map((item) => (
                <div className="det-related-card" key={item.id || item.name}>
                  <img
                    src={item.image_url || heroImg}
                    alt={item.name || "Recommended place"}
                  />
                  <div className="det-related-info">
                    <h3>{item.name || "Unknown"}</h3>
                    <div className="det-related-tags">
                      {item.crowd_status && (
                        <span className={`det-badge ${getCrowdBadgeClass(item.crowd_status)}`}>
                          {item.crowd_status}
                        </span>
                      )}
                      {item.distance && (
                        <span className="det-distance">
                          <FaRegClock /> {item.distance}
                        </span>
                      )}
                    </div>
                    {item.id && (
                      <Link to={`/locations/${item.id}`} className="det-related-link">
                        View Details &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="det-sticky-footer">
        <MdInfo className="info-icon" />
        <span>Crowd status updates every 5 minutes based on real-time data and analytics.</span>
      </div>
    </div>
  );
}

export default Details;
