import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Education = () => {
  const { translate } = useLanguage();

  return (
    <div className="page-content">
      <h1>{translate("education")}</h1>
      <p>{translate("educationPageDescription")}</p>
    </div>
  );
};

export default Education;
