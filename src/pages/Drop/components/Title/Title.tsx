import React from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";
import Creator from "../Creator";

const Title = () => {
  const { dropDetail } = useDropDetailContext();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-drop-title text-white">{dropDetail.title}</h1>
      <Creator creator={dropDetail.creator} />
    </div>
  );
};

export default Title;
