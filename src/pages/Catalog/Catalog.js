import React from 'react';
import './Catalog.css';

const Catalog = () => {
  const categories = [
    {
      id: 1,
      title: 'Entertainment',
      services: ['Movies', 'TV Shows', 'Music', 'Podcasts']
    },
    {
      id: 2,
      title: 'Information',
      services: ['News', 'Weather', 'Stock Market', 'Sports']
    },
    {
      id: 3,
      title: 'Utilities',
      services: ['Games', 'Education', 'Health', 'Finance']
    },
    {
      id: 4,
      title: 'Communication',
      services: ['Messaging', 'Email', 'Video Call', 'Social Media']
    }
  ];

  return (
    <div className="catalog-page">
      <div className="page-content">
        <h1 className="page-title">Service Catalog</h1>
        <p className="page-description">
          Browse through our extensive catalog of services and find what suits your needs.
        </p>

        <div className="catalog-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <h2>{category.title}</h2>
              <ul>
                {category.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <button className="browse-btn">Browse Services</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;