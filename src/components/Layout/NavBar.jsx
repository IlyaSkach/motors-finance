import React, { useState, useEffect } from "react";
import NavLinks from "../Navigation/NavLinks";
import logo from "../../assets/images/logo.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Закрывать меню при изменении размера экрана на более широкий (настольный)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Блокировать прокрутку страницы когда меню открыто на мобильных
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

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
      <div className={`nav-links-container ${isMenuOpen ? "active" : ""}`}>
        <NavLinks onLinkClick={closeMenu} />
      </div>
    </nav>
  );
};

export default NavBar;
