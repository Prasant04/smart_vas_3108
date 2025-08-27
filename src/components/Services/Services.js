import React from 'react';
import ServiceCard from './ServiceCard';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: 'film',
      title: 'Movies',
      description: 'Stream thousands of movies from Bollywood, Hollywood and regional cinema'
    },
    {
      id: 2,
      icon: 'cloud-sun',
      title: 'Weather',
      description: 'Get accurate weather forecasts and real-time updates for your location'
    },
    {
      id: 3,
      icon: 'gamepad',
      title: 'Games',
      description: 'Play hundreds of exciting games across multiple genres and categories'
    },
    {
      id: 4,
      icon: 'newspaper',
      title: 'News',
      description: 'Stay updated with latest news from around the world in multiple languages'
    },
    {
      id: 5,
      icon: 'running',
      title: 'Sports',
      description: 'Follow live sports action, scores and highlights from around the world'
    }
  ];

  return (
    <section className="services">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;