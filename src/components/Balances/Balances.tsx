import userService from "api/user/user.service";
import EthereumPrice from "components/EthereumPrice";
import { useWallet } from "hooks/useWallet";
import { IconRefresh } from "icons";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";

const Balances = (refresh: any) => {
  const { getBalance } = useWallet();
  const { user } = useAppSelector((state) => state.wallet);
  const [balance, setbalance] = useState<number>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }

  function fetchBidBalance() {
    userService.getBidBalance(user.id).then((res) => setBidBalance(res.data ? res.data : 0));
  }

  useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, [refresh]);

  return (
    <div className="flex border border-gray rounded">
      <div className="flex w-full p-4 flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex text-headlineSm font-bigShoulderDisplay text-gray-light">WALLET BALANCE</h1>
          <IconRefresh
            className="w-4 h-4 text-gray-light cursor-pointer hover:text-white"
            onClick={() => {
              fetchBalance();
            }}
          />
        </div>
        <EthereumPrice price={balance} priceClassName="text-head3 text-white" />
      </div>
      <div className="w-[1px] bg-gray"></div>
      <div className="flex w-full p-4 flex-col ">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex text-headlineSm font-bigShoulderDisplay text-gray-light">BID BALANCE</h1>
          <IconRefresh
            className="w-4 h-4 text-gray-light cursor-pointer hover:text-white"
            onClick={() => {
              fetchBidBalance();
            }}
          />
        </div>
        <EthereumPrice price={bidBalance} priceClassName="text-head3 text-white" />
      </div>
    </div>
  );
};

export default Balances;
