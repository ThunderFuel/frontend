import React from "react";
import clsx from "clsx";
import { IconDownRight, IconUpRight } from "icons";

const Change = ({ change }: { change: any }) => {
  const isNull = change === 0 || change === null;
  const text = !isNull ? `${change.toFixed(2)}%` : "-";
  const className = isNull ? "text-white" : change < 0 ? "text-red" : "text-green";

  return (
    <div className="flex items-center">
      <h5 className={clsx("text-h5", className)}>{text}</h5>
      {!isNull ? change < 0 ? <IconDownRight className={className} /> : <IconUpRight className={className} /> : <></>}
    </div>
  );
};

export default Change;
