import React, { useState } from "react";
import "./NewsFeed.css";

export default function NewsFetcher() {
  const [storyId, setStoryId] = useState(""); // user will paste or select a storyId
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setArticles([]);

    try {
      const res = await fetch("https://fe1fb71b44b3.ngrok-free.app/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ story: storyId }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      console.log("✅ Articles from backend:", data);

      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching news:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>News Search</h2>
      <input
        type="text"
        placeholder="Enter storyId..."
        value={storyId}
        onChange={(e) => setStoryId(e.target.value)}
        style={{ padding: "8px", width: "400px" }}
      />
      <button
        onClick={fetchNews}
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Fetch News"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {articles.length === 0 && !loading && <p>No news yet</p>}

        {articles.map((article) => (
          <div
            key={article.article_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              gap: "15px",
              background: "#fafafa",
            }}
          >
            {/* Thumbnail */}
            {article.thumbnail_url && (
              <img
                src={article.thumbnail_url}
                alt={article.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            )}

            {/* Text */}
            <div>
              <h3 style={{ margin: "0 0 5px" }}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  {article.title}
                </a>
              </h3>
              <p style={{ margin: "0 0 8px" }}>{article.snippet}</p>
              <small>
                📰 {article.source_name} •{" "}
                {new Date(article.published_datetime_utc).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}