import { useNavigate } from "react-router-dom";
import "./Placeholder.css";

function Placeholder({ title }) {
  const navigate = useNavigate();

  return (
    <div className="admin-placeholder-page">
      <div className="placeholder-content">
        <h2>{title}</h2>
        <p>This page will not be updated until data integration is complete.</p>
        <button onClick={() => navigate("/admin/dashboard")} className="back-dashboard-btn">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Placeholder;
