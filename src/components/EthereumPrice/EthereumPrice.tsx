import React from "react";
import { IconEthereum } from "icons";
import clsx from "clsx";
import { formatPrice } from "utils";
import Tooltip from "../Tooltip";

const MIN_LIMIT = 0.0001;
const EthereumPrice = ({ price, priceClassName, className }: { price: any; priceClassName?: string; className?: string }) => {
  const lthMinLimit = price < MIN_LIMIT;
  const priceText = lthMinLimit ? "<0.0001" : formatPrice(price);

  const Component = lthMinLimit ? Tooltip : React.Fragment;

  return (
    <Component content={`${price} ETH`}>
      <div className={clsx("flex items-center", className)}>
        <h6 className={clsx(priceClassName ? priceClassName : "text-h5", !price && "text-gray-light")}>{priceText}</h6>
        <IconEthereum className="text-gray-light" />
      </div>
    </Component>
  );
};

export default EthereumPrice;
