import React from "react";
import clsx from "clsx";
import InputError from "../InputError";

interface IInput {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  error?: string;

  [key: string]: any;
}

const Input = ({ className, containerClassName, icon, error, ...etc }: IInput, ref: any) => {
  return (
    <>
      <div className={clsx("input-container flex flex-row items-center gap-2 px-4", "w-full lg:border lg:h-12 lg:rounded lg:border-gray", containerClassName)}>
        <input ref={ref} className={clsx("input", "peer", className)} {...etc} />
        {icon}
      </div>
      {error && <InputError error={error} />}
    </>
  );
};

export default React.forwardRef(Input);
