import React from "react";

const Config = ({ show, children }: { show: boolean; children: React.ReactElement }) => {
  if (!show) {
    return null;
  }

  return children;
};

export default Config;
