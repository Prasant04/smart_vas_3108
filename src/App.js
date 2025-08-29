import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Account from './pages/Account';
import Support from './pages/Support';
import ServicesPage from './pages/ServicesPage';

import Movies from './components/Services/Movies';
import Games from './components/Services/Games';
import News from './components/Services/NewsFeed';


import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ check token properly
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

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
        {/* Auth Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            !isAuthenticated ? (
              <OTPVerification setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected Pages */}
        <Route
          path="/catalog"
          element={isAuthenticated ? <Catalog /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/support"
          element={isAuthenticated ? <Support /> : <Navigate to="/login" />}
        />
        <Route
          path="/services"
          element={isAuthenticated ? <ServicesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/movies"
          element={isAuthenticated ? <Movies /> : <Navigate to="/login" />}
        />
        <Route
          path="/games"
          element={isAuthenticated ? <Games /> : <Navigate to="/login" />}
        />
        <Route
          path="/news"
          element={isAuthenticated ? <News /> : <Navigate to="/login" />}
        />

      </Routes>

      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
