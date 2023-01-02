import React from "react";

const Radio = (props: any, ref: any) => {
  return (
    <label className="radio">
      <input type="radio" className="hidden" ref={ref} />
      <span className={props.className}></span>
      <div>{props.children}</div>
    </label>
  );
};

export default React.forwardRef(Radio);
