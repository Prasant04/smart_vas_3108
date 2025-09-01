// src/Subscription.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Subscription = ({ userId, serviceName, phoneNumber }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ================= SUBSCRIBE FLOW =================
  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `https://e4b3a59d363b.ngrok-free.app/api/subscribe?userId=${userId}&serviceName=${serviceName}&phoneNumber=${phoneNumber}`
      );

      if (res.data.status === "otp_sent") {
        setMessage(res.data.message);
        // ✅ Redirect to OTP verification
        navigate("/verify-otp", {
          state: {
            mode: "subscribe",
            userId,
            serviceName,
            phoneNumber,
          },
        });
      } else {
        setMessage(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error sending OTP for subscribe.");
    }
  };

  // ================= UNSUBSCRIBE FLOW =================
  const handleUnsubscribe = async () => {
    try {
      const res = await axios.post(
        `https://e4b3a59d363b.ngrok-free.app/api/unsubscribe?userId=${userId}&serviceName=${serviceName}&phoneNumber=${phoneNumber}`
      );

      if (res.data.status === "otp_sent") {
        setMessage(res.data.message);
        // ✅ Redirect to OTP verification
        navigate("/verify-otp", {
          state: {
            mode: "unsubscribe",
            userId,
            serviceName,
            phoneNumber,
          },
        });
      } else {
        setMessage(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
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
