// src/SubscriptionOtp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Subscription = ({ userId, serviceName, phoneNumber }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ================= SUBSCRIBE =================
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/subscribe",
        { userId, serviceName, phoneNumber },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === "otp_sent") {
        setMessage(res.data.message);
        navigate("/subscription-otp", {
          state: { mode: "subscribe", userId, serviceName, phoneNumber },
        });
      } else {
        setMessage(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("❌ Subscribe error:", err);
      setMessage("Error sending OTP for subscribe.");
    }
  };

  // ================= UNSUBSCRIBE =================
  const handleUnsubscribe = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/unsubscribe",
        { userId, serviceName, phoneNumber },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === "otp_sent") {
        setMessage(res.data.message);
        navigate("/subscription-otp", {
          state: { mode: "unsubscribe", userId, serviceName, phoneNumber },
        });
      } else {
        setMessage(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("❌ Unsubscribe error:", err);
      setMessage("Error sending OTP for unsubscribe.");
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <h3>Service: {serviceName}</h3>
      <div>
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Subscription;
