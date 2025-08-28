import React from "react";
import "./ServicesPage.css";
import ServiceCard from "../../components/Services/ServiceCard";

const ServicesPage = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        <ServiceCard
          title="Movies"
          description="Enjoy the latest blockbusters and timeless classics."
          icon="🎬"
          link="/services/movies"
        />
        <ServiceCard
          title="Sports"
          description="Live matches, highlights, and sports updates."
          icon="🏆"
          link="/services/sports"
        />
        <ServiceCard
          title="News"
          description="Stay updated with breaking news and top stories."
          icon="📰"
          link="/services/news"
        />
        <ServiceCard
          title="Weather"
          description="Get real-time weather forecasts and alerts."
          icon="☀️"
          link="/services/weather"
        />
        <ServiceCard
          title="Games"
          description="Play fun and exciting games anytime."
          icon="🎮"
          link="/services/games"
        />
      </div>
    </div>
  );
};

export default ServicesPage;
