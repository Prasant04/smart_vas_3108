import React, { useState } from 'react';
import {
  Film,             // Movies 🎬
  Trophy,           // Sports 🏏
  Newspaper,        // News 📰
  Cloud,            // Weather ☁️
  Gamepad2          // Games 🎮
} from 'lucide-react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'movies', name: 'Movies', icon: <Film size={18} /> },
    { id: 'sports', name: 'Sports', icon: <Trophy size={18} /> },
    { id: 'news', name: 'News', icon: <Newspaper size={18} /> },
    { id: 'weather', name: 'Weather', icon: <Cloud size={18} /> },
    { id: 'games', name: 'Games', icon: <Gamepad2 size={18} /> }
  ];

  const services = [
    {
      id: 1,
      title: 'Premium Movies Pack',
      description: 'Unlimited access to the latest movies, blockbusters, and regional cinema',
      category: 'movies',
      features: ['HD & 4K Streaming', 'Multi-language Support', 'New Releases', 'Ad-free Experience'],
      price: '₹299/month',
      popular: true,
      icon: <Film size={28} />
    },
    {
      id: 2,
      title: 'Live Sports Pack',
      description: 'Catch live cricket, football, and all major sporting events',
      category: 'sports',
      features: ['Live Matches', 'Match Highlights', 'Expert Commentary', 'Multi-device Access'],
      price: '₹249/month',
      popular: true,
      icon: <Trophy size={28} />
    },
    {
      id: 3,
      title: 'Daily News Pack',
      description: 'Stay updated with breaking news, politics, and world affairs',
      category: 'news',
      features: ['24/7 News Channels', 'Breaking Alerts', 'Regional Coverage', 'Live TV'],
      price: '₹99/month',
      popular: false,
      icon: <Newspaper size={28} />
    },
    {
      id: 4,
      title: 'Weather Updates Pack',
      description: 'Accurate daily, weekly, and live weather forecasts',
      category: 'weather',
      features: ['Live Forecasts', 'Severe Weather Alerts', 'Air Quality Index', 'Radar Maps'],
      price: '₹49/month',
      popular: false,
      icon: <Cloud size={28} />
    },
    {
      id: 5,
      title: 'Premium Games Pack',
      description: 'Enjoy unlimited access to trending online and mobile games',
      category: 'games',
      features: ['Ad-free Gaming', 'Exclusive Titles', 'Multiplayer Access', 'New Games Monthly'],
      price: '₹199/month',
      popular: false,
      icon: <Gamepad2 size={28} />
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Discover our entertainment and information services designed for you</p>
      </div>

      <div className="services-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.icon && <span className="filter-icon">{category.icon}</span>}
            {category.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className={`service-card ${service.popular ? 'popular' : ''}`}>
            {service.popular && <div className="popular-badge">Most Popular</div>}
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p className="service-description">{service.description}</p>

            <div className="service-features">
              <h4>Features</h4>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="service-price">{service.price}</div>

            <div className="service-actions">
              <button className="details-btn">View Details</button>
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="no-services">
          <h3>No services found in this category</h3>
          <p>Try selecting a different category or check back later for new services.</p>
        </div>
      )}

      <div className="services-cta">
        <h2>Need a Custom Solution?</h2>
        <p>We can tailor our services to meet your specific entertainment needs</p>
        <button className="cta-btn">Contact Sales</button>
      </div>
    </div>
  );
};

export default ServicesPage;
