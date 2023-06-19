import React, { useRef, useState } from "react";
import { IconPencil } from "icons";
import clsx from "clsx";
import Img from "components/Img";
import { uploadFile } from "utils";

const Progress = ({ value }: any) => {
  return (
    <div className="w-full absolute z-10 top-1/2 -translate-y-1/2 flex-center">
      <div className="w-4/5 h-2.5 bg-gray rounded-full">
        <div className="h-2.5 bg-white rounded-full transition-all" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const UploadImage = (props: any) => {
  const [uploadProcess, setUploadProcess] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const ref = useRef<HTMLImageElement>(null);
  const onChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (ref?.current) {
        ref.current.src = URL.createObjectURL(file);
      }

      try {
        setUploadProcess(0);
        setIsUploading(true);
        const url = await uploadFile(file, (process: any) => {
          setUploadProcess(process);
        });
        props.onChange(url);
      } catch (e) {
        props.onChange(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={clsx("relative group overflow-hidden rounded-md", props.className)}>
      <Img alt="cover-image" src={props.src} ref={ref} className="w-full" />
      {isUploading ? (
        <Progress value={uploadProcess} />
      ) : (
        <label className="absolute top-0 left-0 w-full h-full bg-gray/80 hidden cursor-pointer group-hover:flex-center">
          <input accept={"image/*"} className="hidden absolute -z-50" type="file" onChange={onChange} />
          <IconPencil className="text-white" />
        </label>
      )}
    </div>
  );
};

export default UploadImage;
