import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Credit = () => {
  const { translate } = useLanguage();

  return (
    <div className="page-content">
      <h1>{translate("credit")}</h1>
      <p>{translate("creditPageDescription")}</p>
    </div>
  );
};

export default Credit;
