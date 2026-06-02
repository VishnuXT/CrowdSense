import { useLocation } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard Overview";
      case "/admin/categories":
        return "Manage Categories";
      case "/admin/locations":
        return "Manage Locations";
      case "/admin/events":
        return "Manage Events";
      default:
        return "Admin Portal";
    }
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="topbar-right">
        <div className="admin-profile">
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Super Admin</span>
          </div>
          <div className="avatar">A</div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
