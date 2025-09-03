// src/SubscriptionOtpVerify.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/verifyOtp.css"; // ✅ Styling

const SubscriptionOtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mode, userId, serviceName, phoneNumber } = location.state || {};

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError("Please enter the 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        mode === "subscribe" ? "verify-subscribe" : "verify-unsubscribe";

      const res = await axios.post(
        `http://localhost:8080/api/${endpoint}?userId=${userId}&serviceName=${serviceName}&otp=${enteredOtp}`
      );

      if (res.data.status === "success") {
        navigate("/success", {
          state: {
            message:
              mode === "subscribe"
                ? `✅ You have successfully subscribed to ${serviceName}`
                : `✅ You have successfully unsubscribed from ${serviceName}`,
          },
        });
      } else {
        setError(res.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("❌ OTP verification failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h1>SmartVAS</h1>
        <p className="verify-subtitle">Subscription OTP Verification</p>

        <h2>Verify {mode === "subscribe" ? "Subscription" : "Unsubscription"}</h2>
        <p className="verify-instruction">
          Enter the 4-digit OTP sent to your phone <br />
          ending with {phoneNumber?.slice(-4)}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                className="otp-input"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "VERIFY OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionOtpVerify;
