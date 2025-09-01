import React, { useState } from "react";
import "./Movies.css";
import Subscription from "../../SubscriptionOtp"; // ✅ keep only this

const API_KEY = "4df12694";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch movie from OMDB
  const getMovie = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name");
      setMovie(null);
      return;
    }

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data);
        setError("");
        setShowModal(true);
      } else {
        setError(data.Error);
        setMovie(null);
      }
    } catch (err) {
      setError("Error occurred");
      setMovie(null);
    }
  };

  return (
    <div className="main-content">
      <div className="movies-page">
        <div className="movies-container">
          <h1 className="page-title">🎬 Movies</h1>

          <div className="search-container">
            <input
              type="text"
              placeholder="Enter movie name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={getMovie}>Search</button>
          </div>

          {error && <h3 className="msg">{error}</h3>}
        </div>

        {showModal && movie && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={() => setShowModal(false)}>
                ✖
              </span>
              <div className="modal-content">
                <img src={movie.Poster} alt="poster" className="poster" />
                <div className="details-box">
                  <h2>{movie.Title}</h2>
                  <p>
                    <strong>Plot:</strong> {movie.Plot}
                  </p>
                  <p>
                    <strong>Cast:</strong> {movie.Actors}
                  </p>
                  <p className="price">₹499 / month</p>

                  {/* ✅ Subscription component here */}
                  <Subscription userId="2" serviceName={movie.Title} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
