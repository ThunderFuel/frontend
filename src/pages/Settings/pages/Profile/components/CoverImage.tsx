import React from "react";
import UploadImage from "./UploadImage";
import { IconUpload } from "../../../../../icons";

const CoverImage = ({ src, onChange }: any) => {
  return <UploadImage className="w-[500px] h-[315px] overflow-hidden" src={src} onChange={onChange} icon={IconUpload} />;
};

export default CoverImage;
