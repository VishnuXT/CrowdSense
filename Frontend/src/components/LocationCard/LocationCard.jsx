import "./LocationCard.css";

function LocationCard({
  image,
  name,
  category,
  location,
  district,
  crowd,
}) {
  return (
    <div className="location-card">

      <img
        src={image}
        alt={name}
        className="location-image"
      />

      <div className="location-info">

        <div>
          <h3>{name}</h3>

          <span className="category-badge">
            {category}
          </span>
        </div>

        <div className="location-address">
          <p>{location}</p>
          <p>{district}</p>
        </div>

        <div className={`crowd-badge ${crowd.toLowerCase()}`}>
          {crowd}
        </div>

        <button className="details-btn">
          View Details →
        </button>

      </div>
    </div>
  );
}

export default LocationCard;