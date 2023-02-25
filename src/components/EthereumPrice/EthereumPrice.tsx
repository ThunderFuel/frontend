import React from "react";
import { IconEthereum } from "../../icons";
import clsx from "clsx";
import { formatPrice } from "utils";

const EthereumPrice = ({ price, priceClassName, className }: { price: any; priceClassName?: string; className?: string }) => {
  const hasPrice = !!price;

  return (
    <div className={clsx("flex items-center", className)}>
      <h6 className={clsx(priceClassName ? priceClassName : "text-h5", !hasPrice && "text-gray-light")}>{price ? formatPrice(price) : "-"}</h6>
      <IconEthereum className="text-gray-light" />
    </div>
  );
};

export default EthereumPrice;
