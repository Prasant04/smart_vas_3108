import React, { useState } from "react";
import "./NewsFeed.css";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Hardcoded storyId
  const storyId =
    "CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pzbFA3X0N4RjlDUlpVVnhudXBpZ0FQAQ";

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const res = await fetch("https://22cef037e5d7.ngrok-free.app/news", {
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
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📰 Latest News</h2>

      <button
        onClick={fetchNews}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Loading..." : "Load News"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {articles.map((article) => (
          <div
            key={article.article_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
              background: "#fafafa",
            }}
          >
            {/* Thumbnail */}
            <img
              src={article.thumbnail_url || article.photo_url}
              alt={article.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />

            {/* Text */}
            <div style={{ flex: 1 }}>
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
              <p style={{ margin: "5px 0" }}>{article.snippet}</p>
              <p style={{ fontSize: "14px", color: "gray" }}>
                {new Date(article.published_datetime_utc).toLocaleString()} —{" "}
                <img
                  src={article.source_logo_url}
                  alt={article.source_name}
                  style={{
                    width: "16px",
                    height: "16px",
                    verticalAlign: "middle",
                    marginRight: "5px",
                  }}
                />
                {article.source_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
