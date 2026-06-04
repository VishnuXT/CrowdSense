import { useState, useEffect } from "react";
import { FaFolderOpen, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdTrendingUp, MdTrendingFlat } from "react-icons/md";
import "./Dashboard.css";

function Dashboard() {
  const [statsData, setStatsData] = useState({
    total_categories: 0,
    total_locations: 0,
    active_locations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:8000/api/dashboard/summary")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setStatsData({
            total_categories: data.total_categories,
            total_locations: data.total_locations,
            active_locations: data.active_locations,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard summary:", err);
        if (isMounted) {
          // Fallback to mock values on error so the UI never breaks
          setStatsData({
            total_categories: 8,
            total_locations: 34,
            active_locations: 12,
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { 
      title: "Total Categories", 
      value: loading ? "..." : String(statsData.total_categories), 
      icon: <FaFolderOpen />, 
      // trend: "up", 
      // change: "+2 this week", 
      color: "blue" 
    },
    { 
      title: "Total Locations", 
      value: loading ? "..." : String(statsData.total_locations), 
      icon: <FaMapMarkerAlt />, 
      // trend: "up", 
      // change: "+5 this week", 
      color: "green" 
    },
    { 
      title: "Active Locations", 
      value: loading ? "..." : String(statsData.active_locations), 
      icon: <FaCalendarAlt />, 
      // trend: "flat", 
      // change: "Same as last week", 
      color: "yellow" 
    }
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
