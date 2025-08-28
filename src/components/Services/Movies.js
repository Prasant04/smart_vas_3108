import React, { useState } from "react";
import "./Movies.css";

const API_KEY = "4df12694"; // from key.js

export default function Movies() {
  const [query, setQuery] = useState("Wednesday");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

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
    <div className="container">
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie name here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={getMovie}>Search</button>
      </div>

      {/* Result */}
      <div id="result">
        {error && <h3 className="msg">{error}</h3>}

        {movie && (
          <>
            <div className="info">
              <img src={movie.Poster} alt="poster" className="poster" />
              <div>
                <h2>{movie.Title}</h2>
                <div className="rating">
                  <img src="../components/Services/star-icon.svg" alt="star" />
                  <h4>{movie.imdbRating}</h4>
                </div>
                <div className="details">
                  <span>{movie.Rated}</span>
                  <span>{movie.Year}</span>
                  <span>{movie.Runtime}</span>
                </div>
                <div className="genre">
                  {movie.Genre.split(",").map((g, idx) => (
                    <div key={idx}>{g}</div>
                  ))}
                </div>
              </div>
            </div>

            <h3>Plot:</h3>
            <p>{movie.Plot}</p>

            <h3>Cast:</h3>
            <p>{movie.Actors}</p>
          </>
        )}
      </div>
    </div>
  );
}
