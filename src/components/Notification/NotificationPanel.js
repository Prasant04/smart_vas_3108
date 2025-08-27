import React from 'react';
import './NotificationPanel.css';

const NotificationPanel = ({ isOpen }) => {
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New Service Available',
      message: 'Weather forecasting service has been upgraded with new features.',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on June 15th, 2023 from 2:00 AM to 4:00 AM.',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Special Offer',
      message: 'Get 50% off on movie streaming services this weekend.',
      time: '1 day ago'
    }
  ];

  return (
    <div className={`notification-panel ${isOpen ? 'active' : ''}`}>
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="icon-btn">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon">
              <i className={`fas fa-${
                notification.type === 'info' ? 'info-circle' :
                notification.type === 'warning' ? 'exclamation-triangle' : 'gift'
              }`}></i>
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;