import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconInfo, IconOffer, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import CartItem from "../components/CartItem";
import { useWallet } from "hooks/useWallet";
import { formatDisplayedNumber, getDateFromExpirationTime, toGwei } from "utils";
import Select, { ISelectOption } from "components/Select";
import dayjs from "dayjs";
import InputEthereum from "components/InputEthereum";
import Balances from "../components/Balances";

export const selectExpirationDates: ISelectOption[] = [
  {
    text: "1 day",
    value: 1,
  },
  {
    text: "3 days",
    value: 3,
  },
  {
    text: "7 days",
    value: 7,
  },
  {
    text: "1 month",
    value: 30,
  },
  {
    text: "3 months",
    value: 90,
  },
  {
    text: "6 months",
    value: 180,
  },
];

const offerDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const MakeOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }

  useEffect(() => {
    fetchBalance();
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "" || Number(price) === 0);
  };

  const hasEnoughBalance = () => {
    return balance / 1000000000 >= offer;
  };

  const bidBalanceControl = () => {
    return toGwei(offer) - balance;
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
                type: CheckoutType.MakeOffer,
                price: offer,
                expireTime: (dayjs().add(expirationTime?.value, "day").valueOf() / 1000).toFixed(),
              })
            );
            dispatch(toggleCheckoutModal());
          }}
        >
          MAKE OFFER
          <IconOffer />
        </Button>
      </div>
    </div>
  );

  return (
    <RightMenu title="Make Offer" description={offerDescription} footer={footer} onBack={onBack}>
      <CartItem selectedNFT={selectedNFT} />
      <div className="flex flex-col gap-y-2">
        <h6 className="text-head6 font-spaceGrotesk text-white">Your Offer</h6>
        <InputEthereum onChange={setoffer} value={offer} type="text" />
        {balance < toGwei(offer) && (
          <div className="flex w-full items-center gap-x-[5px] text-red">
            <IconWarning width="17px" />
            <span className="text-bodySm font-spaceGrotesk">You don’t have enough funds.</span>
          </div>
        )}
        {toGwei(offer) !== 0 && balance >= toGwei(offer) && toGwei(offer) > balance && (
          <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
            <IconInfo width="17px" />
            {formatDisplayedNumber(bidBalanceControl())} ETH will be automatically added your bid balance to place this bid.
          </span>
        )}
      </div>
      <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk relative z-10">
        Set Expiration Date
        <div className="flex items-center gap-x-[5px] text-bodySm text-gray-light">
          <IconInfo className="w-[17px] h-[17px]" />
          <span>Expires on </span> {getDateFromExpirationTime(expirationTime.value)}
        </div>
        <Select direction="top" options={selectExpirationDates} onChange={setexpirationTime} value={expirationTime} />
      </div>
    </RightMenu>
  );
};

export default MakeOffer;
