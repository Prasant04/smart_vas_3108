import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../services/api";
import "../styles/verifyOtp.css";


const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next box automatically
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
      const response = await verifyOtp(phoneNumber, enteredOtp);
      if (response.data.status === "success") {
        navigate("/movies");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendOtp(phoneNumber);
      alert("OTP resent successfully!");
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      alert("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h1>SmartVAS</h1>
        <p className="verify-subtitle">Your Gateway to Value-Added Services</p>

        <h2>Verify Your Account</h2>
        <p className="verify-instruction">
          We’ve sent a 4-digit verification code to your phone<br />
          ending with {phoneNumber.slice(-4)}
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

        <p className="resend-link" onClick={handleResend}>
          Resend OTP
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
