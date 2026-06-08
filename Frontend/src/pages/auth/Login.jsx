import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaUsers } from "react-icons/fa";
import { FiUser, FiLock, FiEye, FiEyeOff, FiGlobe } from "react-icons/fi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }
    // Navigate to admin dashboard after successful login
    navigate("/admin/dashboard");
  } catch (error) {
    alert(error.message);
  }
};

// Updated public viewer button to navigate to public home without admin token check

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        
        {/* Logo and Header */}
        <div className="admin-login-header">
          <div className="admin-logo-circle">
            <FaUsers className="admin-logo-icon" />
          </div>
          <h2>Crowd<span>Sense</span></h2>
          <p>Smart Crowd Intelligence</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="admin-login-form-inner">
          <div className="admin-input-group">
            <label htmlFor="username">Username</label>
            <div className="admin-input-wrapper">
              <FiUser className="input-icon-left" />
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-wrapper">
              <FiLock className="input-icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>

        <button 
          type="button" 
          className="admin-public-viewer-btn"
          onClick={() => navigate("/")}
        >
          <FiGlobe />
          Go to Public Viewer
        </button>

        {/* Footer */}
        <div className="admin-login-footer">
          <FaShieldAlt className="shield-icon" />
          <span>Authorized Personnel Only</span>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
