import React from "react";
import clsx from "clsx";
import { IconUpload, IconWarning } from "icons";

const UploadFile = ({ className, error, onChange, ...etc }: any, ref: any) => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  const onChangeokan = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imgRef?.current) {
        imgRef.current.src = URL.createObjectURL(file);
      }
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={clsx("relative group flex w-full min-h-[140px] overflow-hidden justify-center items-center rounded-md border  border-gray", className)}>
        {<img ref={imgRef} className="absolute" />}
        <input ref={ref} accept={"image/*"} className="opacity-0 cursor-pointer h-full w-full absolute" type="file" {...etc} onChange={onChangeokan} />
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

export default React.forwardRef(UploadFile);
