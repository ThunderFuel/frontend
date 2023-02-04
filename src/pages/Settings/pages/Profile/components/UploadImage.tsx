import React, { useRef } from "react";
import { IconPencil } from "icons";
import { AssetSettingsCoverImage } from "assets";
import clsx from "clsx";

const UploadImage = (props: any) => {
  const ref = useRef<HTMLImageElement>(null);
  const onChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (ref?.current) {
        ref.current.src = URL.createObjectURL(file);
      }
      props.onChange(file);
    }
  };

  return (
    <div className={clsx("relative group overflow-hidden rounded-md", props.className)}>
      <img alt="cover-image" src={props.src ?? AssetSettingsCoverImage} ref={ref} />
      <label className="absolute top-0 left-0 w-full h-full bg-gray/80 hidden cursor-pointer group-hover:flex-center">
        <input accept={"image/*"} className="hidden absolute -z-50" type="file" onChange={onChange} />
        <IconPencil className="text-white" />
      </label>
    </div>
  );
};

export default UploadImage;
