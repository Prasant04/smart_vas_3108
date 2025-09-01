// src/components/SuccessPage.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const { message } = location.state || { message: "✅ Action completed successfully!" };

  return (
    <div style={{ margin: "40px", textAlign: "center" }}>
      <h2>{message}</h2>
      <br />
      <Link to="/services">
        <button>⬅️ Back to Services</button>
      </Link>
    </div>
  );
};

export default SuccessPage;
