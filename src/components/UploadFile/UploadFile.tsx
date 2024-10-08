import React, { useState } from "react";
import clsx from "clsx";
import { IconUpload, IconWarning } from "icons";
import Img from "../Img";
import { uploadFile } from "utils";

const Progress = ({ value }: any) => {
  return (
    <div className="w-full absolute z-10 p-14">
      <div className="h-2.5 bg-gray rounded-full">
        <div className="h-2.5 bg-white rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const UploadFile = ({ className, error, accept = "image/*", value, onChange }: any) => {
  const [uploadProcess, setUploadProcess] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onInputChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploadProcess(0);
        setIsUploading(true);
        const url = await uploadFile(file, (process: any) => {
          setUploadProcess(process);
        });
        onChange(url);
      } catch (e) {
        onChange(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={clsx("relative group flex w-full min-h-[140px] overflow-hidden justify-center items-center rounded-md border  border-gray", className)}>
        <Img className="absolute" src={value ?? null} />
        <input accept={accept} className="opacity-0 cursor-pointer h-full w-full absolute" type="file" onChange={onInputChange} />
        <IconUpload className="text-gray-light w-10 h-10 group-hover:text-white" />
        {isUploading && <Progress value={uploadProcess} />}
      </label>
      {error && (
        <span className="text-red body-small flex items-center">
          <IconWarning /> {error}
        </span>
      )}
    </div>
  );
};

export default UploadFile;
