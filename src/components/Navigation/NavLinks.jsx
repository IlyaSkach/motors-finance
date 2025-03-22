import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ onLinkClick }) => {
  return (
    <>
      <Link to="/" className="nav-item home" onClick={onLinkClick}>
        Домой
      </Link>
      <Link to="/credit" className="nav-item" onClick={onLinkClick}>
        Кредитование
      </Link>
      <Link to="/insurance" className="nav-item" onClick={onLinkClick}>
        Страхование
      </Link>
      <Link to="/statistics" className="nav-item" onClick={onLinkClick}>
        Статистика
      </Link>
      <Link to="/education" className="nav-item" onClick={onLinkClick}>
        Обучение
      </Link>
      <Link to="/profile" className="nav-item" onClick={onLinkClick}>
        Профиль
      </Link>
    </>
  );
};

export default NavLinks;
