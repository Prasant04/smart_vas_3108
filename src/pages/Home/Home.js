import React from 'react';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />

      <div className="content-section">
        <div className="content-box">
          <h2>About Our Platform</h2>
          <p>SmartVAS provides cutting-edge value-added services to enhance your customer experience and drive growth through innovation and technology.</p>
          <p>Our platform offers a comprehensive suite of tools designed to streamline operations, improve customer engagement, and increase revenue.</p>
        </div>

        <div className="content-box">
          <h2>Featured Services</h2>
          <div className="feature-list">
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <span>AI-Powered Analytics</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-users"></i>
              <span>Customer Engagement Tools</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-bullhorn"></i>
              <span>Automated Marketing Solutions</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-dashboard"></i>
              <span>Real-time Reporting Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;