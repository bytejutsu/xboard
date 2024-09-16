import "./index.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// @Selectors
import { getCodeLanguage, getLanguage } from "@Store/app/selectors";

// @Stores
import { setLanguage } from "@Store/app";

const Switch = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const codeLanguage = useSelector(getCodeLanguage);
  const language = useSelector(getLanguage);

  React.useEffect(() => {
    i18n.changeLanguage(codeLanguage);
  }, [codeLanguage]);

  const handleChange = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <div
      className={`switch-v2-container ${language}`}
      onClick={() => handleChange(language === "vi" ? "en" : "vi")}
    >
      <div className={`block-language ${language === "vi" ? "active" : ""}`}>
        VIE
      </div>
      <div className={`block-language ${language === "en" ? "active" : ""}`}>
        ENG
      </div>
    </div>
  );
};

export default Switch;
