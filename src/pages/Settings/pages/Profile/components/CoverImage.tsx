import React from "react";
import UploadImage from "./UploadImage";
import { IconUpload } from "../../../../../icons";

const CoverImage = ({ src, onChange }: any) => {
  return <UploadImage className="w-full lg:w-[500px] h-[400px] lg:h-[315px] overflow-hidden" src={src} onChange={onChange} icon={IconUpload} />;
};

export default CoverImage;
