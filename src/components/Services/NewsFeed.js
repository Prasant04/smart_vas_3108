import React, { useEffect, useState } from "react";
import "./News.css";

const NewsFeed = ({
  story = "CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pzbFA3X0N4RjlDUlpVVnhudXBpZ0FQAQ",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ story }),
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([data]); // fallback single object
        }
      } catch (err) {
        console.error("❌ Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [story]);

  if (loading) return <p className="loading">Loading news...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className="news-container">
      {articles.length === 0 ? (
        <p>No news available.</p>
      ) : (
        articles.map((article) => (
          <div className="news-card" key={article.article_id || article.link}>
            <img
              src={article.thumbnail_url || article.photo_url}
              alt={article.title}
              className="news-image"
            />
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-snippet">{article.snippet}</p>
              <p className="news-meta">
                {article.source_name} •{" "}
                {article.published_datetime_utc
                  ? new Date(article.published_datetime_utc).toLocaleString()
                  : "Unknown date"}
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read more →
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
