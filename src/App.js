import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import SplashScreen from './components/SplashScreen';
import Login from "./components/Login";
import OTPVerification from "./components/OTPVerification";


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
import WeatherApp from "./components/Services/WeatherApp";
import Sports from "./components/Services/Sports";  // ✅ Now used

import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(false );

  // 🔹 Force authentication ON
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/verify-otp" element={<OTPVerification setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/account" element={<Account />} />
            <Route path="/support" element={<Support />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/games" element={<Games />} />
            <Route path="/news" element={<News />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/sports" element={<Sports />} />
          </>
        )}
      </Routes>


      {isAuthenticated && <Footer />}
    </div>
  );

}

export default App;
