import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New user registered", read: false },
    { id: 2, text: "Server restarted", read: false },
    { id: 3, text: "Payment received", read: false },
  ]);
  const panelRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-panel" ref={panelRef}>
      {/* 🔔 Bell Icon with Badge */}
      <div className="notification-icon" onClick={toggleDropdown}>
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <span>Notifications</span>
            <button onClick={markAllAsRead}>Mark all as read</button>
          </div>
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={n.read ? "read" : "unread"}
                >
                  {n.text}
                </li>
              ))
            ) : (
              <li className="empty">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
