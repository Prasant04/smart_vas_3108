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
      const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Weather App</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "8px 16px" }}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather?.location && weather?.current && (
        <div className="weather-info" style={{ marginTop: "20px" }}>
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            style={{ marginTop: "10px" }}
          />
        </div>
      )}

      {!loading && !weather && !error && (
        <p style={{ marginTop: "20px" }}>No data found</p>
      )}
    </div>
  );
}