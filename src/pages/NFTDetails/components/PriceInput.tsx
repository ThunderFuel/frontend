import Input from "components/Input";
import { IconEthereum } from "icons";
import React from "react";

const PriceInput = (props: any) => {
  return (
    <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk bg-bg-light">
      <Input maxLength="15" {...props} reversed={true} icon={<IconEthereum color="gray" />}></Input>
    </div>
  );
};

export default PriceInput;
