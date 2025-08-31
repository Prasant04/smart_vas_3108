import React, { useState } from "react";
import "./NewsFeed.css";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // 🔒 Hardcoded storyId
  const storyId =
    "CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pzbFA3X0N4RjlDUlpVVnhudXBpZ0FQAQ";

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const res = await fetch("https://2fb448ee806f.ngrok-free.app/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ story: storyId }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching news:", err);
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Subscription handlers
  const handleSubscribe = () => {
    setSubscribed(true);
    alert("✅ Subscribed to News for ₹199/month!");
  };

  const handleUnsubscribe = () => {
    setSubscribed(false);
    alert("❌ Unsubscribed from News.");
  };

  return (
    <div className="news-container">
      <h2>📰 Latest News</h2>

      <button className="news-button" onClick={fetchNews}>
        {loading ? "Loading..." : "Load News"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {articles.map((article) => (
          <div key={article.article_id} className="article-card">
            {/* Thumbnail */}
            <img
              src={article.thumbnail_url || article.photo_url}
              alt={article.title}
            />

            {/* Text */}
            <div style={{ flex: 1 }}>
              <h3 className="article-title">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              </h3>
              <p className="article-snippet">{article.snippet}</p>
              <p className="article-meta">
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

              {/* Price + Buttons */}
              <p className="price">₹199 / month</p>
              <div className="news-actions">
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
        ))}
      </div>
    </div>
  );
}
