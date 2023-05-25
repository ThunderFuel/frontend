import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconInfo, IconOffer, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import CartItem from "../components/CartItem";
import InputPrice from "../components/InputPrice";
import { useWallet } from "hooks/useWallet";
import { getDateFromExpirationTime, toGwei } from "utils";
import Select from "components/Select";
import { selectExpirationDates } from "./MakeOffer";
import dayjs from "dayjs";
import Balances from "../components/Balances";
import userService from "api/user/user.service";

const offerDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const UpdateOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { currentItem } = useAppSelector((state) => state.checkout);
  const { user } = useAppSelector((state) => state.wallet);

  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
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
    return balance / 1000000000 >= offer;
  };

  const bidBalanceControl = () => {
    return <span className="font-bold whitespace-nowrap">{offer - bidBalance} ETH</span>;
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <Balances balance={balance} onFetchBalance={fetchBalance} />
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary">
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(offer) || !hasEnoughBalance()}
          onClick={() => {
            dispatch(
              setCheckout({
                type: CheckoutType.UpdateOffer,
                item: currentItem,
                price: offer,
                expireTime: (dayjs().add(expirationTime?.value, "day").valueOf() / 1000).toFixed(),
                onCheckoutComplete: onBack,
              })
            );
            dispatch(toggleCheckoutModal());
          }}
        >
          UPDATE OFFER
          <IconOffer />
        </Button>
      </div>
    </div>
  );

  return (
    <RightMenu title="Update Offer" description={offerDescription} footer={footer} onBack={onBack}>
      <CartItem selectedNFT={selectedNFT} />
      <div className="flex flex-col gap-y-2">
        <h6 className="text-head6 font-spaceGrotesk text-white">Your Offer</h6>
        <InputPrice onChange={setoffer} value={offer} type="text" />
        {balance < offer && (
          <div className="flex w-full items-center gap-x-[5px] text-red">
            <IconWarning width="17px" />
            <span className="text-bodySm font-spaceGrotesk">You don’t have enough funds.</span>
          </div>
        )}
        {toGwei(offer) !== 0 && balance >= toGwei(offer) && offer > bidBalance && (
          <div className="flex items-center gap-x-[5px] text-bodySm text-orange font-spaceGrotesk">
            <IconInfo width="17px" />
            <span>{bidBalanceControl()} will be automatically added your bid balance to place this bid.</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk">
        Set Expiration Date
        <div className="flex items-center gap-x-[5px] text-bodySm text-gray-light">
          <IconInfo className="w-[17px] h-[17px]" /> <span>Expires on </span> {getDateFromExpirationTime(expirationTime.value)}
        </div>
        <Select options={selectExpirationDates} onChange={setexpirationTime} value={expirationTime} />
      </div>
    </RightMenu>
  );
};

export default UpdateOffer;
