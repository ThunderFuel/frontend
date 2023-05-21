import React from "react";
import UploadImage from "./UploadImage";

const CoverImage = ({ src, onChange }: any) => {
  return <UploadImage src={src} onChange={onChange} />;
};

export default CoverImage;
