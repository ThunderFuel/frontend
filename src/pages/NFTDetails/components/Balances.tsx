import { IconEthereum, IconRefresh } from "icons";
import React from "react";
import { formatDisplayedNumber } from "utils";

const Balances = ({ balance, onFetchBalance }: { balance: number; bidBalance?: number; onFetchBalance: () => void }) => {
  return (
    <div className="flex flex-col gap-y-2 px-5 py-2 border-b border-gray">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <span className="text-gray-light">Wallet Balance</span>
          <IconRefresh className="w-4 h-4 text-gray-light cursor-pointer hover:text-white" onClick={() => onFetchBalance()} />
        </div>
        <div className="flex items-center ">
          {formatDisplayedNumber(balance)}
          <IconEthereum width="20px" color="gray" />
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-light">Bid Balance</span>
        <div className="flex items-center">
          {formatDisplayedNumber(balance)}
          <IconEthereum width="20px" color="gray" />
        </div>
      </div>
    </div>
  );
};

export default Balances;
