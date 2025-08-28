import React from 'react';
import { Link } from 'react-router-dom';
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
          <p>
            SmartVAS provides cutting-edge value-added services to enhance your customer
            experience and drive growth through innovation and technology.
          </p>
          <p>
            Our platform offers a comprehensive suite of tools designed to streamline
            operations, improve customer engagement, and increase revenue.
          </p>
        </div>

        <div className="content-box">
          <h2>Featured Services</h2>
          <div className="feature-list">
            <div className="feature-item">
              <i className="fas fa-film"></i>
              <Link to="/movies">Movies</Link>
            </div>
            <div className="feature-item">
              <i className="fas fa-gamepad"></i>
              <Link to="/games">Games</Link>
            </div>
            <div className="feature-item">
              <i className="fas fa-futbol"></i>
              <Link to="/sports">Sports</Link>
            </div>
            <div className="feature-item">
              <i className="fas fa-music"></i>
              <Link to="/music">Music</Link>
            </div>
            <div className="feature-item">
              <i className="fas fa-newspaper"></i>
              <Link to="/news">News</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
