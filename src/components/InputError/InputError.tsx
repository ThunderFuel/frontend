import React from "react";
import { IconWarning } from "icons";

const InputError = ({ error }: { error: any }) => {
  return (
    <span className="text-red body-small flex items-center">
      <IconWarning /> {error}
    </span>
  );
};

export default InputError;
