import React from "react";
import InputEthereum from "components/InputEthereum/InputEthereum";

const InputPrice = () => {
  return (
    <div className="flex flex-col gap-2">
      <InputEthereum />
      <InputEthereum />
    </div>
  );
};

export default InputPrice;
