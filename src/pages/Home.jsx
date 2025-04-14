import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { translate } = useLanguage();

  return (
    <div className="page-content">
      <h1>{translate("welcomeTitle")}</h1>
      <p>{translate("selectService")}</p>
    </div>
  );
};

export default Home;
