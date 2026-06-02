import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import Details from "./pages/Details/Details";
import About from "./pages/About/About";
import UserLayout from "./components/UserLayout/UserLayout";
import AdminLogin from "./pages/auth/Login";
import AdminDashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Placeholder from "./pages/Placeholder/Placeholder";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes inside UserLayout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/locations/:id" element={<Details />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Admin Login (Standalone) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes inside AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<Placeholder title="Categories" />} />
          <Route path="/admin/locations" element={<Placeholder title="Locations" />} />
          <Route path="/admin/events" element={<Placeholder title="Events" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;