import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "SmartVAS Premium Services",
      description: "Access all our services with a single subscription plan starting at just ₹299/month",
      buttonText: "Get Started",
      className: ""
    },
    {
      title: "Advanced Analytics",
      description: "Gain deep insights into your business with our powerful analytics tools and dashboards",
      buttonText: "Learn More",
      className: "slide-2"
    },
    {
      title: "24/7 Priority Support",
      description: "Get dedicated support from our experts anytime you need assistance",
      buttonText: "Contact Us",
      className: "slide-3"
    }
  ];

  // Fixed the ESLint warning by using useCallback
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]); // Added nextSlide to dependency array

  return (
    <div className="premium-services">
      <div className="carousel" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-slide ${slide.className}`}>
            <h2 className="carousel-title">{slide.title}</h2>
            <p className="carousel-description">{slide.description}</p>
            <button className="carousel-cta">{slide.buttonText}</button>
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-nav">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;