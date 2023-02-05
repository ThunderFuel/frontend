import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconEthereum, IconInfo, IconOffer, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import InfoBox from "../components/InfoBox";
import CartItem from "../components/CartItem";
import { useWallet } from "hooks/useWallet";
import { formatDisplayedNumber, getDateFromExpirationTime, toGwei } from "utils";
import Select, { ISelectOption } from "components/Select";
import dayjs from "dayjs";
import InputEthereum from "components/InputEthereum";

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
  const { selectedNFT, bidBalance } = useAppSelector((state) => state.nftdetails);

  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);

  useEffect(() => {
    getBalance().then((res) => setbalance(res ? res : 0));
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "") && price > 0;
  };

  const bidBalanceControl = () => {
    return toGwei(offer) - bidBalance;
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <div className="flex flex-col gap-y-2 px-5 py-2 border-b border-gray">
        <div className="flex justify-between">
          <span className="text-gray-light">Wallet Balance</span>
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
          disabled={isValidNumber(offer) ? offer > balance : true}
          onClick={() => {
            dispatch(setCheckout({ type: CheckoutType.MakeOffer, price: toGwei(offer), expireTime: dayjs().subtract(expirationTime?.value, "day").startOf("day").valueOf() / 1000 }));
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
    <RightMenu title="Make Offer" footer={footer} onBack={onBack}>
      <InfoBox title="Making an Offer" description={offerDescription} />
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
        {toGwei(offer) !== 0 && balance >= toGwei(offer) && toGwei(offer) > bidBalance && (
          <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
            <IconInfo width="17px" />
            {formatDisplayedNumber(bidBalanceControl())} ETH will be automatically added your bid balance to place this bid.
          </span>
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

export default MakeOffer;
