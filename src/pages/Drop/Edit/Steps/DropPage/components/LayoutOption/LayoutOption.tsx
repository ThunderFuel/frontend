import React from "react";
import { IconText, IconUpload, IconVideo } from "icons";
import clsx from "clsx";
import "./LayoutOption.css";

const LayoutOption = ({ className, reverse, video, ...etc }: any) => {
  return (
    <label className={clsx("layout-option", className)}>
      <input type="radio" {...etc} />
      <ul className={clsx(reverse && "flex-row-reverse")}>
        <li className="bg-gray-100">{video ? <IconVideo /> : <IconUpload />}</li>
        <li className="bg-gray">
          <IconText />
        </li>
      </ul>
    </label>
  );
};

export default LayoutOption;
