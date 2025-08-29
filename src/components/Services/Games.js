import React from "react";
import "./Games.css";

const Games = () => {
  return (
    <div className="game-container">
      <iframe
        src="/tetris/index.html"
        title="Tetris Game"
        style={{
          width: "1500px",    // match canvas + border
          height: "1000px",
          border: "none",
          display: "block",
          margin: "0 auto",
        }}
      ></iframe>
    </div>
  );
};

export default Games;
