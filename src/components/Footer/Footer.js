import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SmartVAS</h3>
          <p>Providing premium value-added services to enhance your digital experience.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#catalog">Catalog</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#account">Account</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-phone"></i> +91 9988774455</li>
            <li><i className="fas fa-envelope"></i> support@smartvas.com</li>
            <li><i className="fas fa-map-marker-alt"></i> Hyderabad, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 SmartVAS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;