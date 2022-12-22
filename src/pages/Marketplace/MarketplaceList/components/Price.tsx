import React from "react";
import { IconEthereum } from "icons";

const Price = ({ price }: { price: any }) => {
  return (
    <div className="flex items-center">
      <h6 className="text-h5">{price}</h6>
      <IconEthereum className="text-gray-light" />
    </div>
  );
};

export default Price;
