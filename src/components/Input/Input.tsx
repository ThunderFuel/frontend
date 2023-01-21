import React from "react";
import clsx from "clsx";

interface IInput {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  reversed?: boolean;

  [key: string]: any;
}

const Input = ({ className, containerClassName, icon, reversed, ...etc }: IInput, ref: any) => {
  return (
    <div className={clsx("flex items-center gap-2 px-4", "w-full lg:border lg:h-12 lg:rounded lg:border-gray", containerClassName, reversed ? "flex-row" : "flex-row-reverse")}>
      <input ref={ref} className={clsx("input", "peer", className)} {...etc} />
      {icon}
    </div>
  );
};

export default React.forwardRef(Input);
