import React, { useState } from 'react';
import NotificationPanel from '../Notification/NotificationPanel';
import './Header.css';

const Header = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-brain"></i>
          <span>SmartVAS</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#catalog">Catalog</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#account">Account</a></li>
          <li><a href="#support">Support</a></li>
        </ul>

        <div className="nav-icons">
          <button className="icon-btn" onClick={toggleNotifications}>
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </nav>

      <NotificationPanel isOpen={notificationOpen} />
    </header>
  );
};

export default Header;