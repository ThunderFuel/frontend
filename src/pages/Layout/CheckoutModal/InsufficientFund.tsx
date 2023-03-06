import React, { useEffect, useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import EthereumPrice from "components/EthereumPrice";
import { IconWarning } from "icons";
import { useWallet } from "hooks/useWallet";
import { formatDisplayedNumber } from "utils";
import { useAppSelector } from "store";
import { Button as BSButton } from "react-bootstrap";

const InsufficientFunds = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { getBalance } = useWallet();
  const { totalAmount } = useAppSelector((state) => state.cart);
  const { user, address } = useAppSelector((state) => state.wallet);

  const [balance, setbalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => {
      setbalance(res ? res : 0);
    });
  }

  useEffect(() => {
    fetchBalance();
  }, [show]);

  const neededAmount = (totalAmount - balance / 1000000000).toFixed(2);

  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full py-2 px-5 justify-between border-b border-gray">
        <span className="text-h6 text-gray-light">Your Balance</span>
        <EthereumPrice className="text-white" price={formatDisplayedNumber(balance)} />
      </div>
      <div className="flex flex-col w-full gap-y-2.5 p-5">
        <BSButton target="_blank" rel="noreferrer" as="a" href={`https://faucet-beta-2.fuel.network/?address=${user?.contractAddress ?? address}`}>
          ADD FUNDS
        </BSButton>
        <Button className="btn-secondary" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    </div>
  );

  return (
    <Modal backdropDisabled={true} className="checkout" title="Insufficient Funds" footer={footer} onClose={onClose} show={show}>
      <div className="flex justify-center gap-x-5 py-8 px-6">
        <div className="flex mt-0.5">
          <IconWarning className="text-red" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-h5 text-white">
            You need <span className="text-h5 text-red">{neededAmount} ETH + gas fees.</span>
          </h5>
          <span className="body-medium text-gray-light">Transfer funds to your wallet or add funds with a card. It can take up to a minute for your balance to update.</span>
        </div>
      </div>
    </Modal>
  );
};

export default InsufficientFunds;
