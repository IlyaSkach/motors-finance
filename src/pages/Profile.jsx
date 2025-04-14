import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Profile = () => {
  const { translate } = useLanguage();

  return (
    <div className="page-content">
      <h1>{translate("profile")}</h1>
      <p>{translate("profilePageDescription")}</p>
    </div>
  );
};

export default Profile;
