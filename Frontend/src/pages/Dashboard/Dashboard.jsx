import { FaFolderOpen, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdTrendingUp, MdTrendingFlat } from "react-icons/md";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    { title: "Total Categories", value: "8", icon: <FaFolderOpen />, trend: "up", change: "+2 this week", color: "blue" },
    { title: "Total Locations", value: "34", icon: <FaMapMarkerAlt />, trend: "up", change: "+5 this week", color: "green" },
    { title: "Active Locations", value: "12", icon: <FaCalendarAlt />, trend: "flat", change: "Same as last week", color: "yellow" }
  ];

  return (
    <div className="dashboard-content">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-card-header">
              <div className={`stat-icon ${stat.color}-bg`}>
                {stat.icon}
              </div>
              <div className={`stat-trend ${stat.trend === "up" ? "text-green" : "text-gray"}`}>
                {stat.trend === "up" ? <MdTrendingUp /> : <MdTrendingFlat />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
