import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const CATEGORIES = ["All", "Movies", "Weather", "Games", "News", "Sports"];

const SERVICES = [
  {
    id: 1,
    title: "Movies",
    category: "Movies",
    blurb: "Stream thousands of movies from Bollywood, Hollywood and regional cinema.",
    icon: "🎬",
    path: "/movies",
  },
  {
    id: 2,
    title: "Weather",
    category: "Weather",
    blurb: "Accurate forecasts and real-time updates for your location.",
    icon: "🌤️",
    path: "/weather", // (create later if you have Weather page)
  },
  {
    id: 3,
    title: "Games",
    category: "Games",
    blurb: "Play hundreds of exciting games across genres and categories.",
    icon: "🎮",
    path: "/games",
  },
  {
    id: 4,
    title: "News",
    category: "News",
    blurb: "Stay updated with the latest news from around the world in multiple languages.",
    icon: "📰",
    path: "/news",
  },
  {
    id: 5,
    title: "Sports",
    category: "Sports",
    blurb: "Live sports action, scores and highlights from around the globe.",
    icon: "🏃‍♂️",
    path: "/sports",
  },
];

export default function Services() {
  const [active, setActive] = useState("All");

  const list = useMemo(() => {
    if (active === "All") return SERVICES;
    return SERVICES.filter((s) => s.category === active);
  }, [active]);

  return (
    <section className="services-page">
      <header className="services-header">
        <h1>Our Services</h1>
        <p>Discover our entertainment and information services designed for you</p>
      </header>

      {/* Filter bar */}
      <div className="services-filters" role="tablist" aria-label="Service filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={`filter-btn ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services grid */}
      <div className="services-grid">
        {list.map((svc) => (
          <article key={svc.id} className={`service-card ${svc.category.toLowerCase()}`}>
            <div className="service-icon" aria-hidden>
              <span>{svc.icon}</span>
            </div>

            <h3>{svc.title}</h3>
            <p className="service-description">{svc.blurb}</p>

            <div className="service-actions">
              <Link to={svc.path} className="details-btn">View details</Link>
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
