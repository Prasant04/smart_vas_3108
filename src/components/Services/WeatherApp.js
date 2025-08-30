import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        `https://22cef037e5d7.ngrok-free.app/weather?city=${encodeURIComponent(city)}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch weather");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "400px", margin: "auto" }}>
      <h1>🌤 Weather App</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "70%",
            marginRight: "5px"
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && weather.location && weather.current && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "10px",
            textAlign: "center"
          }}
        >
          <h2>
            {weather.location.name}, {weather.location.region}
          </h2>
          <p>{weather.location.country}</p>
          <h3>{weather.current.temp_c}°C / {weather.current.temp_f}°F</h3>
          <p>{weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon.startsWith("http")
              ? weather.current.condition.icon
              : `https:${weather.current.condition.icon}`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}
