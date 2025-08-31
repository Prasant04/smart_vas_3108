import React, { useState } from "react";
import "./Games.css";

const Games = () => {
  const [subscribed, setSubscribed] = useState(false);

  // Handle subscribe
  const handleSubscribe = () => {
    setSubscribed(true);
    alert("✅ You have subscribed to Games!");
  };

  // Handle unsubscribe
  const handleUnsubscribe = () => {
    setSubscribed(false);
    alert("❌ You have unsubscribed from Games!");
  };

  return (
    <div className="games-page">
      <div className="games-container">
        {/* Title */}
        <h1 className="games-title">🎮 Games</h1>

        {/* Game Frame */}
        <iframe
          src="/tetris/index.html"
          title="Tetris Game"
          className="game-frame"
        ></iframe>

        {/* Price */}
        <p className="game-price">₹499 / month</p>

        {/* Subscribe / Unsubscribe Buttons */}
        <div className="game-action-buttons">
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
  );
};

export default Games;
