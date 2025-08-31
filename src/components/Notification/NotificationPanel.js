import React, { useState } from "react";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    "New service available",
    "Your subscription is expiring soon",
    "Welcome to SmartVAS!",
  ]);

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <h4>Notifications</h4>
        {notifications.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications </p>
      ) : (
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
