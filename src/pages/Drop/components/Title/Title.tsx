import React from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";

const Title = () => {
  const { dropDetail } = useDropDetailContext();

  return <h1 className="text-drop-title text-white">{dropDetail.title}</h1>;
};

export default Title;
