import React, { useEffect, useState } from "react";
import "./Sports.css";

function Sports() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch("https://099c4597a5ed.ngrok-free.app/cricket", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const allMatches =
          data?.typeMatches?.flatMap((tm) =>
            tm.seriesMatches?.flatMap((sm) =>
              sm.seriesAdWrapper?.matches || []
            )
          ) || [];
        setMatches(allMatches);
      })
      .catch((err) => console.error("Error fetching cricket data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Subscribe/Unsubscribe handlers
  const handleSubscribe = () => {
    setSubscribed(true);
    alert("✅ Subscribed to Live Cricket for ₹199 / month");
  };

  const handleUnsubscribe = () => {
    setSubscribed(false);
    alert("❌ Unsubscribed from Live Cricket");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading cricket data...</p>;
  if (matches.length === 0) return <p style={{ textAlign: "center" }}>No matches available.</p>;

  return (
    <div className="cricket-container">
      <h1>🏏 Live Cricket Matches</h1>

      {matches.map((match) => {
        const info = match.matchInfo;
        const score = match.matchScore;

        return (
          <div key={info.matchId} className="series-card">
            <h3>{info.seriesName}</h3>

            <div className="match-card">
              <h4>
                {info.team1.teamName} ({info.team1.teamSName}) vs{" "}
                {info.team2.teamName} ({info.team2.teamSName})
              </h4>
              <p>
                <b>{info.matchDesc}</b> — {info.stateTitle}
              </p>
              <p>
                <b>Status:</b> {info.status}
              </p>
              <p>
                <b>Venue:</b> {info.venueInfo.ground}, {info.venueInfo.city}
              </p>
              <p>
                <b>Format:</b> {info.matchFormat}
              </p>

              {/* Scores */}
              {score && (
                <div className="score">
                  <p>
                    {info.team1.teamSName}:{" "}
                    {score.team1Score?.inngs1?.runs ?? 0}/
                    {score.team1Score?.inngs1?.wickets ?? 0} (
                    {score.team1Score?.inngs1?.overs ?? 0} ov)
                  </p>
                  <p>
                    {info.team2.teamSName}:{" "}
                    {score.team2Score?.inngs1?.runs ?? 0}/
                    {score.team2Score?.inngs1?.wickets ?? 0} (
                    {score.team2Score?.inngs1?.overs ?? 0} ov)
                  </p>
                </div>
              )}

              {/* Price */}
              <p className="price">₹199 / month</p>

              {/* Action buttons */}
              <div className="action-buttons">
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
      })}
    </div>
  );
}

export default Sports;
