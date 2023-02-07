import EthereumPrice from "components/EthereumPrice";
import { useWallet } from "hooks/useWallet";
import { IconRefresh } from "icons";
import React, { useEffect, useState } from "react";
import { formatDisplayedNumber } from "utils";

const Balances = () => {
  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex border border-gray rounded">
      <div className="flex w-full p-4 flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex text-headlineSm font-bigShoulderDisplay text-gray-light">WALLET BALANCE</h1>
          <IconRefresh className="w-4 h-4 text-gray-light cursor-pointer hover:text-white" onClick={() => fetchBalance()} />
        </div>
        <EthereumPrice price={formatDisplayedNumber(balance)} priceClassName="text-head3 text-white" />
      </div>
      <div className="w-[1px] bg-gray"></div>
      <div className="flex w-full p-4 flex-col">
        <h1 className="flex text-headlineSm font-bigShoulderDisplay text-gray-light">BID BALANCE</h1>
        <EthereumPrice price={0.5} priceClassName="text-head3 text-white" />
      </div>
    </div>
  );
};

export default Balances;
