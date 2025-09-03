// src/components/Services/Movies.js
import React, { useState } from "react";
import "./Movies.css";

const API_KEY = "4df12694";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Fetch movie from OMDB API
  const getMovie = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name");
      setMovie(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data);
        setError("");
      } else {
        setError(data.Error);
        setMovie(null);
      }
    } catch (err) {
      setError("Error occurred while fetching movie");
      setMovie(null);
    }
    setLoading(false);
  };

  // 📌 Subscription handlers
  const handleSubscribe = () => {
    setSubscribed(true);
    alert(`✅ Subscribed to ${movie.Title} for ₹499/month!`);
  };

  const handleUnsubscribe = () => {
    setSubscribed(false);
    alert(`❌ Unsubscribed from ${movie.Title}.`);
  };

  return (
    <div className="main-content">
      <div className="movies-page">
        <h1 className="page-title">🎬 Movies</h1>

        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={getMovie} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error */}
        {error && <h3 className="msg">{error}</h3>}

        {/* Movie Details */}
        {movie && (
          <div className="movie-details">
            <img src={movie.Poster} alt={movie.Title} className="poster" />
            <div className="details-box">
              <h2>{movie.Title}</h2>
              <p>
                <strong>Plot:</strong> {movie.Plot}
              </p>
              <p>
                <strong>Cast:</strong> {movie.Actors}
              </p>

              {/* Price + Dummy Subscription */}
              <p className="price">₹499 / month</p>
              <div className="movie-actions">
                <button
                  className="subscribe-btn"
                  onClick={handleSubscribe}
                  disabled={subscribed}
                >
                  Subscribe
                </button>
                <button
                  className="unsubscribe-btn"
                  onClick={handleUnsubscribe}
                  disabled={!subscribed}
                >
                  Unsubscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
