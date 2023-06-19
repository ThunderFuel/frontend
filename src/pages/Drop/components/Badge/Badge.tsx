import React from "react";
import clsx from "clsx";

import "./Badge.css";

const Badge = ({ className, children }: any) => {
  return <div className={clsx("drop-item-badge", className)}>{children}</div>;
};

export default Badge;
