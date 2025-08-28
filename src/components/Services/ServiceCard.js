// src/components/Services/ServiceCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ title, description, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleClick}>View Details</button>
    </div>
  );
};

export default ServiceCard;
