import React from "react";

const Checkbox = (props: any, ref: any) => {
  const { className, children, ...etc } = props;

  return (
    <label className="checkbox">
      <input type="checkbox" className="hidden" ref={ref} {...etc} />
      <span className={className}></span>
      <div>{children}</div>
    </label>
  );
};

export default React.forwardRef(Checkbox);
