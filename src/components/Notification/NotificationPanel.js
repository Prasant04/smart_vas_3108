import React from "react";
import "./NotificationPanel.css";

const NotificationPanel = () => {
  return (
    <div className="notification-panel">
      <h4>Notifications</h4>
      <ul>
        <li>New service available</li>
        <li>Your subscription is expiring soon</li>
        <li>Welcome to SmartVAS!</li>
      </ul>
    </div>
  );
};

export default NotificationPanel;
