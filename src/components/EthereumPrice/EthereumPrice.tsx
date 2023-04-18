import React from "react";
import { IconEthereum } from "icons";
import clsx from "clsx";
import { formatPrice } from "utils";
import Tooltip from "../Tooltip";

const MIN_LIMIT = 0.0001;
const EthereumPrice = ({ price, priceClassName, className, fullPrice }: { price: any; priceClassName?: string; className?: string; fullPrice?: boolean }) => {
  const priceValue = price || 0;
  const lthMinLimit = priceValue > 0 && priceValue < MIN_LIMIT;
  const priceText = priceValue === 0 ? 0 : lthMinLimit ? "<0.0001" : formatPrice(price);

  console.log(lthMinLimit);
  const Component = lthMinLimit && !fullPrice ? Tooltip : React.Fragment;

  return (
    <Component content={`${price} ETH`}>
      <div className={clsx("flex items-center", className)}>
        <h6 className={clsx(priceClassName ? priceClassName : "text-h5", !price && "text-gray-light")}>{fullPrice ? price : priceText}</h6>
        <IconEthereum className="text-gray-light" />
      </div>
    </Component>
  );
};

export default EthereumPrice;
