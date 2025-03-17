import React, { useState } from "react";
import "./navbar.css";
import logo from "../Assets/Cricketer logo.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="CricHub Logo" />
        <span className="logo-name">CricHub</span>
      </Link>

      {/* Hamburger Menu Icon (Mobile Only) */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={toggleMobileMenu}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/matches" onClick={toggleMobileMenu}>
            Matches
          </Link>
        </li>
        <li>
          <Link to="/schedule" onClick={toggleMobileMenu}>
            Schedule
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" onClick={toggleMobileMenu}>
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/news" onClick={toggleMobileMenu}>
            News
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;