// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">🍺</span> BrewDash
      </div>
      
      <nav className="nav-menu">
        <Link to="/" className={`nav-item ${path === "/" ? "active" : ""}`}>
          <span className="nav-icon">🏠</span> Dashboard
        </Link>
        <Link to="/search" className={`nav-item ${path === "/search" ? "active" : ""}`}>
          <span className="nav-icon">🔍</span> Search
        </Link>
        <Link to="/about" className={`nav-item ${path === "/about" ? "active" : ""}`}>
          <span className="nav-icon">ℹ️</span> About
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
