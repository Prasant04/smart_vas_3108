import React, { useState, useEffect, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { img: "src/assets/entertainment.jpg", alt: "Entertainment", title: "Entertainment", desc: "Movies, music & more at your fingertips" },
    { img: "/assets/sports.jpg", alt: "Sports", title: "Sports", desc: "Stay updated with live scores & highlights" },
    { img: "/assets/weather.jpg", alt: "Weather", title: "Weather", desc: "Get the latest forecasts & alerts" },
    { img: "/assets/games.jpg", alt: "Games", title: "Games", desc: "Play and explore trending mobile games" },
    { img: "/assets/news.jpg", alt: "News", title: "News", desc: "Breaking headlines & top stories" }
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
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={slide.img} alt={slide.alt} className="carousel-image" />
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-description">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
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
