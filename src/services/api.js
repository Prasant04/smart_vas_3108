// src/services/api.js
import axios from "axios";

// Axios instance with base URL
const api = axios.create({
  baseURL: "/api", // forwarded to backend via proxy (setupProxy.js handles localhost:8080)
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== AUTH APIs ====================

// Login with phone number
export const loginUser = (phoneNumber) => {
  return api.get(`/login`, { params: { user_phone_number: phoneNumber } });
};

// Register new user
export const registerUser = (userData) => {
  return api.post("/register", userData);
};

// Send OTP for login
export const sendOtp = (phoneNumber) => {
  return api.post("/sendotp", { user_phone_number: phoneNumber });
};

// Verify OTP for login
export const verifyOtp = (phoneNumber, otp) => {
  return api.post("/verifyotp", { user_phone_number: phoneNumber, otp });
};

// ==================== SUBSCRIPTION APIs ====================

// Step 1: request OTP for subscribe
export const requestSubscribeOtp = (userId, serviceName, phoneNumber) => {
  return api.post(`/subscribe`, null, {
    params: { userId, serviceName, phoneNumber },
  });
};

// Step 2: verify OTP for subscribe
export const verifySubscribe = (userId, serviceName, otp, phoneNumber) => {
  return api.post(`/verify-subscribe`, null, {
    params: { userId, serviceName, otp, phoneNumber },
  });
};

// Step 1: request OTP for unsubscribe
export const requestUnsubscribeOtp = (userId, serviceName, phoneNumber) => {
  return api.post(`/unsubscribe`, null, {
    params: { userId, serviceName, phoneNumber },
  });
};

// Step 2: verify OTP for unsubscribe
export const verifyUnsubscribe = (userId, serviceName, otp, phoneNumber) => {
  return api.post(`/verify-unsubscribe`, null, {
    params: { userId, serviceName, otp, phoneNumber },
  });
};

// ==================== ERROR HANDLING ====================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response && error.response.status === 403) {
      alert(
        "CORS error detected. Please try again or check your backend configuration."
      );
    }
    return Promise.reject(error);
  }
);

export default api;
