import React, { useState } from "react";
import "./Movies.css";

const API_KEY = "4df12694"; // OMDB API Key

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPaymentBox, setShowPaymentBox] = useState(false);

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
        setShowModal(true); // Open modal
        setShowPaymentBox(false); // Reset payment box
      } else {
        setError(data.Error);
        setMovie(null);
      }
    } catch (err) {
      setError("Error occurred");
      setMovie(null);
    }
  };

  // Handle subscribe
  const handleSubscribe = () => {
    setShowPaymentBox(true);
  };

  // Handle payment confirm
  const handlePay = () => {
    alert("✅ Payment Successful! You are now subscribed.");
    setShowPaymentBox(false);
    setShowModal(false);
  };

  // Handle cancel payment
  const handleCancel = () => {
    setShowPaymentBox(false);
  };

  return (
    <div className="main-content">
      <div className="movies-page">
        {/* Page Title */}
        <h1 className="page-title">🎬 Movies</h1>

        {/* Search bar */}
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

        {/* Modal for movie details */}
        {showModal && movie && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
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

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="subscribe-btn" onClick={handleSubscribe}>
                      Subscribe
                    </button>
                    <button className="unsubscribe-btn">
                      Unsubscribe
                    </button>
                  </div>

                  {/* Payment Box */}
                  {showPaymentBox && (
                    <div className="payment-box">
                      <h3>Confirm Subscription</h3>
                      <p>You will be charged <strong>₹499 / month</strong></p>
                      <button className="pay-btn" onClick={handlePay}>
                        Pay ₹499
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
