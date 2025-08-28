import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { img: "/assets/banner1.jpg", alt: "SmartVAS Premium Services" },
    { img: "/assets/banner2.jpg", alt: "Advanced Analytics" },
    { img: "/assets/banner3.jpg", alt: "24/7 Priority Support" }
  ];

  // Always move forward
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="premium-services">
      <div
        className="carousel"
        style={{ transform: `translateX(${currentSlide * 100}%)` }} // ✅ flipped direction
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.img} alt={slide.alt} className="carousel-image" />
          </div>
        ))}
      </div>

      {/* Only Next Button (forward/right) */}
      <button className="carousel-btn next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots Navigation */}
      <div className="carousel-nav">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
