// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Subscription from "./Subscription";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import OTPVerification from "./components/OTPVerification";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Account from "./pages/Account";
import Support from "./pages/Support";
import ServicesPage from "./pages/ServicesPage";

import Movies from "./components/Services/Movies";
import Games from "./components/Services/Games";
import NewsFeed from "./components/Services/NewsFeed";
import WeatherApp from "./components/Services/WeatherApp";
import Sports from "./components/Services/Sports";

import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        {!isAuthenticated ? (
          <>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/verify-otp"
              element={<OTPVerification setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/register"
              element={<Register setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Protected Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/account" element={<Account />} />
            <Route path="/support" element={<Support />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/games" element={<Games />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/subscription" element={<Subscription />} />

            {/* OTP verification for subscription/unsubscription */}
            <Route
              path="/verify-otp"
              element={<OTPVerification setIsAuthenticated={setIsAuthenticated} />}
            />

          </>
        )}
      </Routes>

      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
