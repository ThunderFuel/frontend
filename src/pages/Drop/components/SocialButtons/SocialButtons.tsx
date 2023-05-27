import React from "react";
import SocialButtonsBase from "../../../Collection/components/SocialButtons";
import clsx from "clsx";

import "./SocialButtons.css";

const SocialButtons = ({ className, ...etc }: any) => {
  return <SocialButtonsBase className={clsx(className, "drop-share")} {...etc} disableShare={true} />;
};

export default SocialButtons;
