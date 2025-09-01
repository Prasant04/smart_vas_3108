import React, { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPaymentBox, setShowPaymentBox] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://e4b3a59d363b.ngrok-free.app/weather?city=${encodeURIComponent(city)}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Failed to fetch weather");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle subscribe
  const handleSubscribe = () => {
    setShowPaymentBox(true);
  };

  // Confirm payment
  const handlePay = () => {
    alert("✅ Payment Successful! You are now subscribed to Weather updates.");
    setShowPaymentBox(false);
  };

  // Cancel subscription/payment
  const handleCancel = () => {
    setShowPaymentBox(false);
  };

  return (
    <div className="weather-container">
      <h1>🌤 Weather App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        <button onClick={fetchWeather} className="weather-button">
          Search
        </button>
      </div>

      {loading && <p className="weather-loading">Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && weather.location && weather.current && (
        <div className="weather-result">
          <h2>
            {weather.location.name}, {weather.location.region}
          </h2>
          <p>{weather.location.country}</p>
          <h3>
            {weather.current.temp_c}°C / {weather.current.temp_f}°F
          </h3>
          <p>{weather.current.condition.text}</p>
          <img
            src={
              weather.current.condition.icon.startsWith("http")
                ? weather.current.condition.icon
                : `https:${weather.current.condition.icon}`
            }
            alt="weather icon"
          />

          {/* Subscribe/Unsubscribe Buttons */}
          <div className="action-buttons">
            <button className="subscribe-btn" onClick={handleSubscribe}>
              Subscribe
            </button>
            <button className="unsubscribe-btn">Unsubscribe</button>
          </div>

          {/* Payment Box */}
          {showPaymentBox && (
            <div className="payment-box">
              <h3>Confirm Subscription</h3>
              <p>
                You will be charged <strong>₹299 / month</strong> for Weather
                updates.
              </p>
              <button className="pay-btn" onClick={handlePay}>
                Pay ₹299
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
