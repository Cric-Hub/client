import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Links */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i> {/* Facebook icon */}
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i> {/* Twitter icon */}
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> {/* Instagram icon */}
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube"></i> {/* YouTube icon */}
        </a>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/careers">Careers</a>
        <a href="/related-sites">Related Sites</a>
        <a href="/about">About</a>
        <a href="/icc">CricHub</a>
      </div>

      {/* Footer Logo */}
      <div className="footer-logo">
        <h1>CricHub</h1>
      </div>

      {/* Copyright Notice */}
      <div className="footer-copyright">
        <p>Copyright © 2025 CricHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;