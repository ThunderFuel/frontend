import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { IconArrowRight, IconBid, IconInfo, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import CartItem from "../components/CartItem";
import InputPrice from "../components/InputPrice";
import { useWallet } from "hooks/useWallet";
import { toGwei } from "utils";
import Balances from "../components/Balances";
import userService from "api/user/user.service";

const bidDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const PlaceBid = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { getBalance } = useWallet();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user } = useAppSelector((state) => state.wallet);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [bid, setBid] = useState<any>("");
  const [balance, setBalance] = useState<any>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => setBalance(res ? res : 0));
  }
  function fetchBidBalance() {
    userService.getBidBalance(user.id).then((res) => setBidBalance(res.data ? res.data : 0));
  }

  useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "" || Number(price) === 0);
  };

  const hasEnoughBalance = () => {
    return balance / 1000000000 >= bid;
  };

  const bidBalanceControl = () => {
    return <span className="font-bold whitespace-nowrap">{parseFloat((bid - bidBalance).toFixed(9))} ETH</span>;
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <Balances balance={balance} onFetchBalance={fetchBalance} />
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary">
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(bid) || !hasEnoughBalance() ? true : isButtonDisabled}
          onClick={() => {
            setIsButtonDisabled(true);

            dispatch(setCheckout({ type: CheckoutType.PlaceBid, price: bid, onCheckoutComplete: onBack }));
            dispatch(toggleCheckoutModal());
          }}
        >
          PLACE A BID <IconBid />
        </Button>
      </div>
    </div>
  );

  return (
    <RightMenu title="Place a Bid" description={bidDescription} footer={footer} onBack={onBack}>
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
        {!toGwei(bid).eq(0) && balance >= toGwei(bid) && bid > bidBalance && (
          <div className="flex items-center gap-x-[5px] text-bodySm text-orange font-spaceGrotesk">
            <IconInfo width="17px" />
            <span>{bidBalanceControl()} will be automatically added your bid balance to place this bid.</span>
          </div>
        )}
      </div>
    </RightMenu>
  );
};

export default PlaceBid;
