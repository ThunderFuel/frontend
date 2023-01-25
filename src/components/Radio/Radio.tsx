import React from "react";

const Radio = (props: any, ref: any) => {
  const { children, className, ...etc } = props;

  return (
    <label className="radio">
      <input type="radio" className="hidden" ref={ref} {...etc} />
      <span className={className}></span>
      <div>{children}</div>
    </label>
  );
};

export default React.forwardRef(Radio);
