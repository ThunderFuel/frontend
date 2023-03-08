import React from "react";
import "./Tooltip.css";
import clsx from "clsx";

interface ITooltip {
  children: React.ReactNode;
  position?: "bottom" | "top" | null;
  content?: any;
}

const Tooltip = ({ children, position = "top", content }: ITooltip) => {
  return (
    <div className={clsx("tooltip", position)}>
      {children}
      <div className="content">
        {content} <span className="arrow" />
      </div>
    </div>
  );
};

export default Tooltip;
