import React from "react";
import "./Tooltip.css";
import clsx from "clsx";

interface ITooltip {
  children: React.ReactNode;
  position?: string;
  content?: any;
  hiddenArrow?: any;
  contentClass?: any;
}

const Tooltip = ({ children, position = "top", content, contentClass, hiddenArrow = false }: ITooltip) => {
  return (
    <div className={clsx("tooltip", position)}>
      {children}
      <div className={clsx("content", contentClass)}>
        {content} {!hiddenArrow && <span className="arrow" />}
      </div>
    </div>
  );
};

export default Tooltip;
