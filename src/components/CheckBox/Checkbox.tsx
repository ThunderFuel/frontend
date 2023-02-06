import React from "react";

const Checkbox = (props: any, ref: any) => {
  const { className, children, onClick, ...etc } = props;

  return (
    <label className="checkbox">
      <input type="checkbox" className="hidden" ref={ref} {...etc} onClick={onClick} />
      <span className={className}></span>
      {children && <div className="pl-2">{children}</div>}
    </label>
  );
};

export default React.forwardRef(Checkbox);
