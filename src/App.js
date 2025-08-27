import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Account from './pages/Account';
import Support from './pages/Support';
import ServicesPage from './pages/ServicesPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'catalog': return <Catalog />;
      case 'account': return <Account />;
      case 'support': return <Support />;
      case 'services': return <ServicesPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="App">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;