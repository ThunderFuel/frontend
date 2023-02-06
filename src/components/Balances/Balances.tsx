import EthereumPrice from "components/EthereumPrice";
import { useWallet } from "hooks/useWallet";
import React, { useEffect, useState } from "react";
import { formatDisplayedNumber } from "utils";

const Balances = () => {
  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);

  useEffect(() => {
    getBalance().then((res) => setbalance(res ? res : 0));
  }, []);

  return (
    <div className="flex border border-gray rounded">
      <div className="flex w-full p-4 flex-col">
        <h1 className="flex text-headlineSm font-bigShoulderDisplay text-gray-light">WALLET BALANCE</h1>
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
