import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const NavLinks = ({ onLinkClick }) => {
  const { translate } = useLanguage();

  return (
    <>
      <div className="nav-links-menu">
        <Link to="/" className="nav-item home" onClick={onLinkClick}>
          {translate("home")}
        </Link>
        <Link to="/credit" className="nav-item" onClick={onLinkClick}>
          {translate("credit")}
        </Link>
        <Link to="/insurance" className="nav-item" onClick={onLinkClick}>
          {translate("insurance")}
        </Link>
        <Link to="/statistics" className="nav-item" onClick={onLinkClick}>
          {translate("statistics")}
        </Link>
        <Link to="/education" className="nav-item" onClick={onLinkClick}>
          {translate("education")}
        </Link>
        <Link to="/profile" className="nav-item" onClick={onLinkClick}>
          {translate("profile")}
        </Link>
      </div>
      <LanguageSwitcher />
    </>
  );
};

export default NavLinks;
