import React from "react";
import InputLabel from "components/InputLabel";

const Input = (props: any, ref: any) => {
  return <InputLabel {...props} ref={ref} />;
};

export default React.forwardRef(Input);
