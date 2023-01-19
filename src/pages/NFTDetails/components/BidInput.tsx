import Input from "components/Input";
import { IconEthereum, IconInfo, IconWarning } from "icons";
import React from "react";

const BidInput = ({ text }: { text: string }) => {
  const Warning = () => {
    return (
      <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
        {/* TODO balance checkleri hazirla*/}
        <IconInfo width="17px" />
        1.2 ETH will be automatically added your bid balance to place this bid.
      </span>
    );
  };

  const Error = () => {
    return (
      <span className="flex items-center gap-x-[5px] text-bodySm text-red">
        {/* TODO balance checkleri hazirla*/}
        <IconWarning width="17px" />
        You don`t have enough funds.
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk">
      Your {text}
      {/* TODO input icon un yerini ayarla */}
      <Input containerClassName="bg-gray" icon={<IconEthereum />}></Input>
      <Error />
      <Warning />
    </div>
  );
};

export default BidInput;
