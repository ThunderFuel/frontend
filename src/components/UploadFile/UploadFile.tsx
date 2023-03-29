import React from "react";
import clsx from "clsx";
import { IconUpload, IconWarning } from "icons";

const UploadFile = ({ className, src, error, ...etc }: any) => {
  // const onChange = (e: any) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     if (ref?.current) {
  //       ref.current.src = URL.createObjectURL(file);
  //     }
  //     props.onChange(file);
  //   }
  // };

  return (
    <div className="flex flex-col gap-2">
      <div className={clsx("relative group flex w-full min-h-[140px] overflow-hidden justify-center items-center rounded-md border  border-gray", className)}>
        {src && <img alt="cover-image" src={URL.createObjectURL(src)} className="absolute" />}
        <input accept={"image/*"} className="opacity-0 cursor-pointer h-full w-full absolute" type="file" {...etc} />
        <IconUpload className="text-gray-light w-10 h-10 group-hover:text-white" />
      </div>
      {error && (
        <span className="text-red body-small flex items-center">
          <IconWarning /> {error}
        </span>
      )}
    </div>
  );
};

export default UploadFile;
