import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { IconArrowRight, IconBid, IconEthereum, IconInfo, IconRefresh, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import InfoBox from "../components/InfoBox";
import CartItem from "../components/CartItem";
import InputPrice from "../components/InputPrice";
import { useWallet } from "hooks/useWallet";
import { formatDisplayedNumber, toGwei } from "utils";

const bidDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const PlaceBid = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { getBalance } = useWallet();
  const { selectedNFT, bidBalance } = useAppSelector((state) => state.nftdetails);

  const [bid, setBid] = useState<any>("");
  const [balance, setBalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => setBalance(res ? res : 0));
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "" || Number(price) === 0);
  };

  const bidBalanceControl = () => {
    return toGwei(bid) - bidBalance;
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex flex-col gap-y-2 px-5 py-2 border-b border-gray">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-1">
            <span className="text-gray-light">Wallet Balance</span>
            <IconRefresh className="w-4 h-4 text-gray-light cursor-pointer hover:text-white" onClick={() => fetchBalance()} />
          </div>
          <div className="flex items-center ">
            {formatDisplayedNumber(balance)}
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-light">Bid Balance </span>
          <div className="flex items-center">
            {formatDisplayedNumber(bidBalance)}
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary">
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(bid)}
          onClick={() => {
            dispatch(setCheckout({ type: CheckoutType.PlaceBid, price: bid }));
            dispatch(toggleCheckoutModal());
          }}
        >
          PLACE A BID <IconBid />
        </Button>
      </div>
    </div>
  );

  return (
    <RightMenu title="Place a Bid" footer={footer} onBack={onBack}>
      <InfoBox title="Placing a Bid" description={bidDescription} />
      <CartItem selectedNFT={selectedNFT} />
      <div className="flex flex-col gap-y-2 ">
        <h6 className="text-head6 font-spaceGrotesk text-white">Your Bid</h6>
        <InputPrice onChange={setBid} value={bid} type="text" />
        {balance < toGwei(bid) && (
          <div className="flex w-full items-center gap-x-[5px] text-red">
            <IconWarning width="17px" />
            <span className="text-bodySm font-spaceGrotesk">You don’t have enough funds.</span>
          </div>
        )}
        {bid !== "" && balance >= toGwei(bid) && toGwei(bid) >= bidBalance && (
          <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
            <IconInfo width="17px" />
            {formatDisplayedNumber(bidBalanceControl())} ETH will be automatically added your bid balance to place this bid.
          </span>
        )}
      </div>
    </RightMenu>
  );
};

export default PlaceBid;
