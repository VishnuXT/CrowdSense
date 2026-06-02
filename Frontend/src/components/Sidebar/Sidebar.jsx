import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdCategory, MdLocationOn, MdEvent, MdLogout } from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In the future, clear auth tokens here
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/categories", name: "Categories", icon: <MdCategory /> },
    { path: "/admin/locations", name: "Locations", icon: <MdLocationOn /> },
    { path: "/admin/events", name: "Events", icon: <MdEvent /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <h2>Crowd<span>Sense</span></h2>
        <p>Admin Portal</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <MdLogout className="logout-icon" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
