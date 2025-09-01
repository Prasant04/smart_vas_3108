// src/OTPVerification.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtp,
  sendOtp,
  verifySubscribe,
  verifyUnsubscribe,
} from "../services/api";
import "../styles/verifyOtp.css";

const OTPVerification = ({ setIsAuthenticated }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from Login.js or Subscription.js
  const { mode, phoneNumber, userId, serviceName } = location.state || {};

  useEffect(() => {
    if (!phoneNumber) navigate("/login");
  }, [phoneNumber, navigate]);

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, countdown]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setError("Please enter the complete 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      let response;

      if (mode === "login") {
        // 🔑 Login verification
        response = await verifyOtp(phoneNumber, otpValue);
        if (response.data.status === "success") {
          localStorage.setItem("authToken", "dummy-token");
          localStorage.setItem("phoneNumber", phoneNumber);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          setError(response.data.message || "Invalid OTP. Please try again.");
        }
      } else if (mode === "subscribe") {
        // 📌 Subscription verification
        response = await verifySubscribe(userId, serviceName, otpValue, phoneNumber);
        if (response.data.status === "success") {
          alert(`✅ Subscribed to ${serviceName} successfully!`);
          navigate("/services");
        } else {
          setError(response.data.message || "Subscription failed.");
        }
      } else if (mode === "unsubscribe") {
        // ❌ Unsubscription verification
        response = await verifyUnsubscribe(userId, serviceName, otpValue, phoneNumber);
        if (response.data.status === "success") {
          alert(`❌ Unsubscribed from ${serviceName} successfully!`);
          navigate("/services");
        } else {
          setError(response.data.message || "Unsubscription failed.");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setResendDisabled(true);
    setCountdown(30);

    try {
      if (mode === "login") {
        const response = await sendOtp(phoneNumber);
        if (response.data.status === "success") {
          alert("OTP has been resent to your phone");
        } else {
          setError("Failed to resend OTP. Please try again.");
        }
      } else {
        alert("Resend OTP not available for subscription/unsubscription.");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <main className="verify-page">
      <section className="verify-card">
        <h1 className="login-brand">SmartVAS</h1>
        <p className="login-subtitle">Your Gateway to Value-Added Services</p>

        <h2 className="verify-title">Verify OTP</h2>

        <p className="otp-message">
          {mode === "login" && `We’ve sent a 4-digit code to ${phoneNumber}`}
          {mode === "subscribe" &&
            `Enter OTP sent to ${phoneNumber} to subscribe to ${serviceName}`}
          {mode === "unsubscribe" &&
            `Enter OTP sent to ${phoneNumber} to unsubscribe from ${serviceName}`}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
              />
            ))}
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Verifying..." : "VERIFY OTP"}
          </button>
        </form>

        {mode === "login" && (
          <div className="resend-link">
            {resendDisabled ? (
              <p>Resend OTP in {countdown}s</p>
            ) : (
              <span onClick={handleResendOtp}>Resend OTP</span>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default OTPVerification;
