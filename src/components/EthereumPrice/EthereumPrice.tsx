import React from "react";
import { IconEthereum } from "icons";
import clsx from "clsx";
import { formatPrice } from "utils";
import Tooltip from "../Tooltip";

const MIN_LIMIT = 0.0001;
const EmptyFragment = ({ children }: any) => {
  return <div>{children}</div>;
};
const EthereumPrice = ({
  price,
  priceClassName,
  className,
  fullPrice,
  iconClassName,
  isNull,
}: {
  price: any;
  priceClassName?: string;
  className?: string;
  fullPrice?: boolean;
  iconClassName?: any;
  isNull?: boolean;
}) => {
  const priceValue = price ? (typeof price === "string" ? Number(price) : price) : 0;
  const lthMinLimit = priceValue > 0 && priceValue < MIN_LIMIT;
  const priceText = priceValue === 0 ? 0 : lthMinLimit ? "<0.0001" : formatPrice(price);

  const Component = lthMinLimit && !fullPrice ? Tooltip : EmptyFragment;

  const text = isNull && !priceValue ? "-" : fullPrice ? price : priceText;

  return (
    <Component content={`${price} ETH`}>
      <div className={clsx("flex items-center", className)}>
        <h6 className={clsx(priceClassName ? priceClassName : "text-h5", !price && "text-gray-light")}>{text}</h6>
        {!isNull && <IconEthereum className={clsx("text-gray-light", iconClassName)} />}
      </div>
    </Component>
  );
};

export default EthereumPrice;
