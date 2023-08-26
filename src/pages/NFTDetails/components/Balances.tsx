import userService from "api/user/user.service";
import { IconRefresh } from "icons";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";
import EthereumPrice from "../../../components/EthereumPrice";

const Balances = ({ balance, onFetchBalance }: { balance: number; onFetchBalance: () => void }) => {
  const { user } = useAppSelector((state) => state.wallet);

  const [bidBalance, setBidBalance] = useState(0);

  function fetchBidBalance() {
    userService.getBidBalance(user.id).then((res) => setBidBalance(res.data ? res.data : 0));
  }

  useEffect(() => {
    fetchBidBalance();
  }, []);

  return (
    <div className="flex flex-col gap-y-2 px-5 py-2 border-b border-gray">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <span className="text-gray-light">Wallet Balance</span>
          <IconRefresh className="w-4 h-4 text-gray-light cursor-pointer hover:text-white" onClick={() => onFetchBalance()} />
        </div>
        <div className="flex items-center">
          <EthereumPrice price={balance} priceClassName="text-h6" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <span className="text-gray-light">Bid Balance</span>
          <IconRefresh className="w-4 h-4 text-gray-light cursor-pointer hover:text-white" onClick={() => fetchBidBalance()} />
        </div>
        <div className="flex items-center">
          <EthereumPrice price={bidBalance} priceClassName="text-h6" />
        </div>
      </div>
    </div>
  );
};

export default Balances;
