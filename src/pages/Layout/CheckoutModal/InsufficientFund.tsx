import React, { useEffect, useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import EthereumPrice from "components/EthereumPrice";
import { IconWarning } from "icons";
import { useWallet } from "hooks/useWallet";
import { isObjectEmpty, formatPrice } from "utils";
import { useAppSelector } from "store";
import { Button as BSButton } from "react-bootstrap";
import { FUEL_FAUCET_URL } from "global-constants";

const InsufficientFunds = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const { getBalance } = useWallet();
  const { totalAmount, buyNowItem } = useAppSelector((state) => state.cart);
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

  const neededAmount = parseFloat(((!isObjectEmpty(buyNowItem) ? buyNowItem.price : totalAmount) - balance).toFixed(9));
  const footer = (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex w-full py-2 px-5 justify-between border-b border-gray">
        <span className="text-h6 text-gray-light">Your Balance</span>
        <EthereumPrice className="text-white" price={balance} />
      </div>
      <div className="flex flex-col w-full gap-y-2.5 p-5">
        <BSButton target="_blank" rel="noreferrer" as="a" href={`${FUEL_FAUCET_URL}/?address=${user?.contractAddress ?? address}&redirectUrl=https%3A%2F%2Fthundernft.market%2F`}>
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
      <div className="flex justify-center gap-x-5 py-8 px-[15px] lg:px-6">
        <div className="flex mt-0.5">
          <IconWarning className="text-red" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-h5 text-white">
            You need <span className="text-h5 text-red">{formatPrice(neededAmount)} ETH + gas fees.</span>
          </h5>
          <span className="body-medium text-gray-light">Transfer funds to your wallet or add funds with a card. It can take up to a minute for your balance to update.</span>
        </div>
      </div>
    </Modal>
  );
};

export default InsufficientFunds;
