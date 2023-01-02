import React from "react";
import clsx from "clsx";

interface IInput {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;

  [key: string]: any;
}

const Input = ({ className, containerClassName, icon, ...etc }: IInput, ref: any) => {
  return (
    <div className={clsx("flex flex-row-reverse items-center gap-2 px-4", "w-full lg:border lg:h-12 lg:rounded lg:border-gray", containerClassName)}>
      <input ref={ref} className={clsx("input", "peer", className)} {...etc} />
      {icon}
    </div>
  );
};

export default React.forwardRef(Input);
