import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { getLocationsByCategory } from "../../services/api";
import "./Location.css";
import heroImg from "../../assets/images/hero.png";

function Location() {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const categoryId = routerLocation.state?.categoryId;
  const categoryName = routerLocation.state?.categoryName;

  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (categoryId) {
      fetchLocations();
    }
  }, [categoryId]);

  const fetchLocations = async () => {
    try {
      const response = await getLocationsByCategory(categoryId);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const getCrowdBadge = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "badge-green";

      case "medium":
        return "badge-yellow";

      case "high":
        return "badge-red";

      default:
        return "";
    }
  };

  const filteredLocations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return locations;

    return locations.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.crowd_status?.toLowerCase().includes(query)
    );
  }, [locations, searchTerm]);

  return (
    <div className="location-page">
      <div
        className="loc-hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="loc-overlay">
          <div className="loc-hero-content">
            <h1>
              <span>{categoryName}</span> in Thiruvananthapuram
            </h1>

            <p>
              Select a place to view crowd status and other details.
            </p>
          </div>
        </div>
      </div>

      <div className="loc-main-container">
        <div className="loc-search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search place..."
            className="loc-search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="loc-list">
          {filteredLocations.map((item) => (
            <div className="loc-card" key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className="loc-card-img"
              />

              <div className="loc-col title-col">
                <h2>{item.name}</h2>

                <span className="loc-category-badge">
                  {item.category}
                </span>
              </div>

              <div className="loc-col divider-col">
                <p>{item.description}</p>
              </div>

              <div className="loc-col divider-col">
                <span className="crowd-label">
                  Crowd Status
                </span>

                <div
                  className={`crowd-badge ${getCrowdBadge(
                    item.crowd_status
                  )}`}
                >
                  <MdPeopleAlt />
                  {item.crowd_status}
                </div>
              </div>

              <div className="loc-col btn-col">
                <button
                  onClick={() =>
                    navigate(`/locations/${item.id}`)
                  }
                  className="loc-details-btn"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <div className="loc-empty-state">
              No locations found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Location;