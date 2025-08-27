import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import NotificationPanel from "../Notification/NotificationPanel";

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
    // Reset count when opening
    if (!isNotificationOpen) {
      setNotificationCount(0);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      alert("Logout successful!");
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
        <div className="logo">
          <i className="fas fa-brain"></i>
          <span>
            SmartVAS<span className="logo-reg">°</span>
          </span>
        </div>

        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <a href="#home" className="active">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="#catalog">
                <i className="fas fa-book"></i> Catalog
              </a>
            </li>
            <li>
              <a href="#services">
                <i className="fas fa-cogs"></i> Services
              </a>
            </li>
            <li>
              <a href="#account">
                <i className="fas fa-user"></i> Account
              </a>
            </li>
            <li>
              <a href="#support">
                <i className="fas fa-headset"></i> Support
              </a>
            </li>
          </ul>

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
