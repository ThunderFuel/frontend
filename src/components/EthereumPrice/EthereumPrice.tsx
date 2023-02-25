import React from "react";
import { IconEthereum } from "../../icons";
import clsx from "clsx";

const EthereumPrice = ({ price, priceClassName, className }: { price: any; priceClassName?: string; className?: string }) => {
  const hasPrice = !!price;

  const formatPrice = (price: number) => {
    if (typeof price === "string") return price;
    const formattedNum = price.toFixed(4).replace(/\.?0+$/, "");

    return formattedNum;
  };

  return (
    <div className={clsx("flex items-center", className)}>
      <h6 className={clsx(priceClassName ? priceClassName : "text-h5", !hasPrice && "text-gray-light")}>{price ? formatPrice(price) : "-"}</h6>
      <IconEthereum className="text-gray-light" />
    </div>
  );
};

export default EthereumPrice;
