import * as React from "react";

import "./InputSwitch.css";
import clsx from "clsx";

const InputSwitch = ({ className, ...etc }: any, ref: any) => {
  return (
    <label className={clsx("input-switch", className)}>
      <input ref={ref} type="checkbox" {...etc} />
      <span className="slider" />
    </label>
  );
};

export default React.forwardRef(InputSwitch);
