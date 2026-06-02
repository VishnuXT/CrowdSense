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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", username, password);
    navigate("/admin/dashboard");
  };

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
