import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={`fas fa-${service.icon}`}></i>
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <a href="#services">Explore →</a>
      </div>
    </div>
  );
};

export default ServiceCard;