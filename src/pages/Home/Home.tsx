import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "router/Router";
import { useTranslation } from "react-i18next";
import { ReactComponent as Icon } from "icons/icon-arrow-left.svg";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="font-semibold">{t`hello`}</div>
      <Link to={PATHS.LOGIN}>Logine git</Link>

      <Icon />
    </div>
  );
};

export default Home;
