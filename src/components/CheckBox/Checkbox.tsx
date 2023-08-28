import React from "react";

const Checkbox = (props: any, ref: any) => {
  const { className, children, onClick, ...etc } = props;

  return (
    <label
      className="checkbox"
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
