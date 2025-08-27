import React, { useState } from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'cloud', name: 'Cloud Services' },
    { id: 'api', name: 'API Integration' },
    { id: 'support', name: 'Customer Support' }
  ];

  const services = [
    {
      id: 1,
      title: 'Enterprise Cloud Storage',
      description: 'Secure, scalable cloud storage solutions with advanced encryption and compliance features',
      category: 'cloud',
      features: ['1TB Storage', 'Advanced Security', '99.9% Uptime', '24/7 Support'],
      price: '$49.99/month',
      popular: true
    },
    {
      id: 2,
      title: 'REST API Integration',
      description: 'Seamless integration with RESTful APIs for your business applications',
      category: 'api',
      features: ['Unlimited Calls', 'Webhooks', 'Documentation', 'SDK Support'],
      price: '$29.99/month',
      popular: false
    },
    {
      id: 3,
      title: 'Advanced Analytics Suite',
      description: 'Comprehensive data analytics with visualization and reporting tools',
      category: 'analytics',
      features: ['Real-time Dashboards', 'Custom Reports', 'Data Export', 'AI Insights'],
      price: '$79.99/month',
      popular: true
    },
    {
      id: 4,
      title: 'Premium Support Package',
      description: 'Dedicated customer support with guaranteed response times',
      category: 'support',
      features: ['24/7 Support', '15min Response', 'Dedicated Engineer', 'Phone Support'],
      price: '$99.99/month',
      popular: false
    },
    {
      id: 5,
      title: 'Basic Cloud Storage',
      description: 'Essential cloud storage for small businesses and individuals',
      category: 'cloud',
      features: ['100GB Storage', 'Basic Security', '99% Uptime', 'Email Support'],
      price: '$9.99/month',
      popular: false
    },
    {
      id: 6,
      title: 'Webhook Management',
      description: 'Manage and monitor webhooks for your integrations',
      category: 'api',
      features: ['100 Webhooks', 'Monitoring', 'Retry System', 'Logs'],
      price: '$19.99/month',
      popular: false
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Discover our comprehensive suite of value-added services designed to empower your business</p>
      </div>

      <div className="services-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className={`service-card ${service.popular ? 'popular' : ''}`}>
            {service.popular && <div className="popular-badge">Most Popular</div>}
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
        <p>We can tailor our services to meet your specific business requirements</p>
        <button className="cta-btn">Contact Sales</button>
      </div>
    </div>
  );
};

export default ServicesPage;