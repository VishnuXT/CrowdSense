import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import "./Location.css";
import heroImg from "../../assets/images/hero.png";

const locations = [
  {
    id: 1,
    name: "Kovalam Beach",
    category: "Beach",
    address: "Kovalam\nThiruvananthapuram",
    crowdLevel: "Medium",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
  {
    id: 2,
    name: "Shanghumugham Beach",
    category: "Beach",
    address: "Shanghumugham\nThiruvananthapuram",
    crowdLevel: "Low",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
  },
  {
    id: 3,
    name: "Veli Beach",
    category: "Beach",
    address: "Veli\nThiruvananthapuram",
    crowdLevel: "High",
    image: "https://images.unsplash.com/photo-1596895111956-bf57b102b5e2?w=800",
  },
  {
    id: 4,
    name: "Akkulam Tourist Area",
    category: "Tourist Attraction",
    address: "Akkulam\nThiruvananthapuram",
    crowdLevel: "Medium",
    image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f28a?w=800",
  },
];

function Location() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const getCrowdBadge = (level) => {
    switch(level) {
      case "Low": return "badge-green";
      case "Medium": return "badge-yellow";
      case "High": return "badge-red";
      default: return "";
    }
  };

  const filteredLocations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return locations;

    return locations.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      item.crowdLevel.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  return (
    <div className="location-page">
      <div 
        className="loc-hero-bg" 
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="loc-overlay">
          <div className="loc-hero-content">
            <h1><span>Beaches</span> in Thiruvananthapuram</h1>
            <p>Select a place to view crowd status and other details.</p>
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
              <img src={item.image} alt={item.name} className="loc-card-img" />

              <div className="loc-col title-col">
                <h2>{item.name}</h2>
                <span className="loc-category-badge">{item.category}</span>
              </div>

              <div className="loc-col divider-col">
                <p>{item.address.split('\n')[0]}</p>
                <p>{item.address.split('\n')[1]}</p>
              </div>

              <div className="loc-col divider-col">
                <span className="crowd-label">Crowd Status</span>
                <div className={`crowd-badge ${getCrowdBadge(item.crowdLevel)}`}>
                  <MdPeopleAlt /> {item.crowdLevel}
                </div>
              </div>

              <div className="loc-col btn-col">
                <button
                  onClick={() => navigate(`/locations/${item.id}`)}
                  className="loc-details-btn"
                >
                  View Details &rarr;
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
