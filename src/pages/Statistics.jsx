import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Statistics = () => {
  const { translate } = useLanguage();

  return (
    <div className="page-content">
      <h1>{translate("statistics")}</h1>
      <p>{translate("statisticsPageDescription")}</p>
    </div>
  );
};

export default Statistics;
