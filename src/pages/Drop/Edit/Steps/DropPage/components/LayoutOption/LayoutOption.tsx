import React from "react";
import { IconText, IconUpload } from "icons";
import clsx from "clsx";
import "./LayoutOption.css";

const LayoutOption = ({ className, reverse, name, ...etc }: any) => {
  return (
    <label {...etc} className={clsx("layout-option", className)}>
      <input type="radio" name={name} />
      <ul className={clsx(reverse && "flex-row-reverse")}>
        <li className="bg-gray-100">
          <IconUpload />
        </li>
        <li className="bg-gray">
          <IconText />
        </li>
      </ul>
    </label>
  );
};

export default LayoutOption;
