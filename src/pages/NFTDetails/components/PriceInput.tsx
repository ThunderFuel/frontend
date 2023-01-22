import Input from "components/Input";
import { IconEthereum } from "icons";
import React from "react";

const PriceInput = (props: any) => {
  // const Warning = () => {
  //   return (
  //     <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
  //       {/* TODO balance checkleri hazirla*/}
  //       <IconInfo width="17px" />
  //       1.2 ETH will be automatically added your bid balance to place this bid.
  //     </span>
  //   );
  // };

  // const Error = () => {
  //   return (
  //     <span className="flex items-center gap-x-[5px] text-bodySm text-red">
  //       {/* TODO balance checkleri hazirla*/}
  //       <IconWarning width="17px" />
  //       You don`t have enough funds.
  //     </span>
  //   );
  // };

  return (
    <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk ">
      <Input {...props} reversed={true} icon={<IconEthereum color="gray" />}></Input>
    </div>
  );
};

export default PriceInput;
