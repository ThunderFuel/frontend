import React from "react";
import { numberFormat } from "utils";

import "./Process.css";

const Process = ({ available, taken }: any) => {
  const processWidth = React.useMemo(() => {
    return (taken / (available + taken)) * 100;
  }, [available, taken]);

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-headline-02 text-opacity-50">AVAILABLE</span>
        <h6 className="text-h6 text-white">{numberFormat(available)}</h6>
      </div>
      <div className="process">
        <span className="transition-all min-w-[0.625rem]" style={{ width: `${processWidth}%` }} />
      </div>
    </div>
  );
};

export default Process;
