import React, { useState } from "react";
import NavLinks from "../Navigation/NavLinks";
import logo from "../../assets/images/logo.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Motors Finance" />
      </div>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger ${isMenuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <NavLinks onLinkClick={closeMenu} />
      </div>
    </nav>
  );
};

export default NavBar;
