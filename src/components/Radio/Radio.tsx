import React from "react";
import clsx from "clsx";

const Radio = (props: any, ref: any) => {
  const { children, className, containerClassName, ...etc } = props;

  return (
    <label className={clsx("radio", containerClassName)}>
      <input type="radio" className="hidden" ref={ref} {...etc} />
      <span className={className}></span>
      <div>{children}</div>
    </label>
  );
};

export default React.forwardRef(Radio);
