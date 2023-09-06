import React from "react";
import clsx from "clsx";

const Checkbox = (props: any, ref: any) => {
  const { className, children, onClick, containerClassName, ...etc } = props;

  return (
    <label
      className={clsx("checkbox", containerClassName)}
      onClick={(e) => {
        onClick(e);
        e.preventDefault();
      }}
    >
      <input type="checkbox" className="hidden" ref={ref} {...etc} />
      <span className={className}></span>
      {children && <div className="pl-2">{children}</div>}
    </label>
  );
};

export default React.forwardRef(Checkbox);
