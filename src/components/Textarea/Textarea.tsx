import React from "react";
import clsx from "clsx";
import { IconWarning } from "../../icons";

interface ITextarea {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  children: string;
  error: string;

  [key: string]: any;
}

const Textarea = ({ className, containerClassName, icon, error, ...etc }: ITextarea, ref: any) => {
  return (
    <>
      <div className={clsx("input-container flex flex-row items-center gap-2 p-4", "w-full lg:border lg:rounded lg:border-gray", containerClassName)}>
        <textarea ref={ref} className={clsx("input peer resize-none", className)} {...etc}></textarea>
        {icon}
      </div>
      {error && (
        <span className="text-red body-small flex items-center">
          <IconWarning /> {error}
        </span>
      )}
    </>
  );
};

export default React.forwardRef(Textarea);
