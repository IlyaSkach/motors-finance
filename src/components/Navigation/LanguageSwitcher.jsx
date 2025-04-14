import React from "react";
import { useLanguage, languages } from "../../context/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <div className="language-switcher">
      <div className="language-title">{translate("language")}</div>
      <div className="language-options">
        <button
          className={`language-button ${
            language === languages.RU ? "active" : ""
          }`}
          onClick={() => setLanguage(languages.RU)}
        >
          РУС
        </button>
        <button
          className={`language-button ${
            language === languages.EN ? "active" : ""
          }`}
          onClick={() => setLanguage(languages.EN)}
        >
          ENG
        </button>
        <button
          className={`language-button ${
            language === languages.AR ? "active" : ""
          }`}
          onClick={() => setLanguage(languages.AR)}
        >
          عربي
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
