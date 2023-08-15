import React from "react";
import UploadImage from "./UploadImage";

const CoverImage = ({ src, onChange }: any) => {
  return <UploadImage className="overflow-hidden" style={{ height: "var(--profile-cover-image-height)", width: "var(--profile-cover-image-width)" }} src={src} onChange={onChange} />;
};

export default CoverImage;
