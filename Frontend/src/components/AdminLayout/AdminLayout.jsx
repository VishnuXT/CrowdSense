import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout-container">
      <Sidebar />
      <div className="admin-main-wrapper">
        <Topbar />
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
