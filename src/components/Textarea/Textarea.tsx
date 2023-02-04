import React from "react";
import clsx from "clsx";

interface ITextarea {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;

  [key: string]: any;
}

const Textarea = ({ className, containerClassName, icon, ...etc }: ITextarea, ref: any) => {
  return (
    <div className={clsx("input-container flex flex-row items-center gap-2 p-4", "w-full lg:border lg:rounded lg:border-gray", containerClassName)}>
      <textarea ref={ref} className={clsx("input peer resize-none", className)} {...etc}></textarea>
      {icon}
    </div>
  );
};

export default React.forwardRef(Textarea);
