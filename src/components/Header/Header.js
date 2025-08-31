import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ⬅️ Use NavLink
import "./Header.css";
import NotificationPanel from "../Notification/NotificationPanel";

const Header = ({ setIsAuthenticated }) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
    if (!isNotificationOpen) setNotificationCount(0);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("phoneNumber");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo1">
          <i className="fas fa-brain"></i>
          <span>
            SmartVAS<span className="logo-reg">°</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                <i className="fas fa-home"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog">
                <i className="fas fa-book"></i> Catalog
              </NavLink>
            </li>
            <li>
              <NavLink to="/services">
                <i className="fas fa-cogs"></i> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/account">
                <i className="fas fa-user"></i> Account
              </NavLink>
            </li>
            <li>
              <NavLink to="/support">
                <i className="fas fa-headset"></i> Support
              </NavLink>
            </li>
          </ul>

          {/* Icons */}
          <div className="nav-icons" ref={notificationRef}>
            <button className="icon-btn" onClick={handleNotificationClick}>
              <i className="fas fa-bell"></i>
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>

            {isNotificationOpen && <NotificationPanel />}

            <button className="icon-btn logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
