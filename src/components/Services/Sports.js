import React, { useEffect, useState } from "react";
import "./Sports.css";


function CricketApp() {
  const [cricketData, setCricketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCricket = async () => {
      try {
        const res = await fetch("https://fe1fb71b44b3.ngrok-free.app/cricket");
        if (!res.ok) throw new Error("Failed to fetch cricket data");
        const data = await res.json();
        setCricketData(data);
      } catch (err) {
        console.error("Error fetching cricket data:", err);
        setCricketData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCricket();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading cricket data...</p>;

  if (!cricketData) return <p style={{ textAlign: "center" }}>No data available.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏏 Live Cricket Matches</h1>

      {cricketData.typeMatches?.map((typeBlock, idx) => (
        <div key={idx} style={{ marginBottom: "30px" }}>
          <h2 style={{ borderBottom: "2px solid #333" }}>{typeBlock.matchType}</h2>

          {typeBlock.seriesMatches?.map((series, sIdx) => {
            if (!series.seriesAdWrapper) return null; // skip ads

            return (
              <div key={sIdx} style={{ margin: "20px 0", padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}>
                <h3>{series.seriesAdWrapper.seriesName}</h3>

                {series.seriesAdWrapper.matches?.map((match, mIdx) => (
                  <div
                    key={mIdx}
                    style={{
                      margin: "10px 0",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      background: "#fff"
                    }}
                  >
                    <h4>
                      {match.matchInfo.team1.teamName} ({match.matchInfo.team1.teamSName}) vs{" "}
                      {match.matchInfo.team2.teamName} ({match.matchInfo.team2.teamSName})
                    </h4>
                    <p>
                      <b>Status:</b> {match.matchInfo.status}
                    </p>
                    <p>
                      <b>Venue:</b> {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}
                    </p>
                    <p>
                      <b>Format:</b> {match.matchInfo.matchFormat} | <b>Match:</b> {match.matchInfo.matchDesc}
                    </p>

                    {match.matchScore && (
                      <div>
                        <p>
                          {match.matchInfo.team1.teamSName}:{" "}
                          {match.matchScore.team1Score?.inngs1?.runs}/{match.matchScore.team1Score?.inngs1?.wickets} (
                          {match.matchScore.team1Score?.inngs1?.overs} ov)
                        </p>
                        <p>
                          {match.matchInfo.team2.teamSName}:{" "}
                          {match.matchScore.team2Score?.inngs1?.runs}/{match.matchScore.team2Score?.inngs1?.wickets} (
                          {match.matchScore.team2Score?.inngs1?.overs} ov)
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CricketApp;