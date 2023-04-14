import React from "react";
import UploadImage from "./UploadImage";

const CoverImage = ({ src }: any) => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return <UploadImage src={src} onChange={onChange} />;
};

export default CoverImage;
