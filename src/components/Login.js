import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, sendOtp } from "../services/api";
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const userResponse = await loginUser(phoneNumber);

      if (userResponse.data && userResponse.data.length > 0) {
        const otpResponse = await sendOtp(phoneNumber);
        if (otpResponse.data.status === "success") {
          localStorage.setItem("user_phone_number", phoneNumber);
          navigate("/verify-otp", { state: { mode: "login", phoneNumber } });

        } else {
          setError("Failed to send OTP. Please try again.");
        }
      } else {
        setError("User not found. Please register first.");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found. Please register first.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* Removed redundant role="region" */}
      <section className="login-card" aria-label="Login">
        <header className="login-header">
          <h1 className="login-brand">SmartVAS</h1>
          <p className="login-subtitle">Your Gateway to Value-Added Services</p>
        </header>

        <h2 className="login-form-title">Welcome</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <input
              id="phone"
              type="text"
              className="login-input"
              placeholder="Enter your 10-digit mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength="10"
              autoComplete="tel"
            />
            {error && <div className="login-error">{error}</div>}
          </div>

          <button
            type="submit"
            className={`login-btn ${loading ? "is-loading" : ""}`}
            disabled={loading}
          >
            {loading && <span className="btn-spinner" aria-hidden="true"></span>}
            {loading ? "Sending…" : "SEND VERIFICATION CODE"}
          </button>
        </form>

        <div className="login-link">
          Don’t have an account? <Link to="/register">Create Account</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
