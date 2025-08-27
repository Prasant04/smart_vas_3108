import React from 'react';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
    </div>
  );
};

export default Home;