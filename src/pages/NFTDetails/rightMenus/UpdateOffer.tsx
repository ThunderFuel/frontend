import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconEthereum, IconInfo, IconOffer, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import InfoBox from "../components/InfoBox";
import CartItem from "../components/CartItem";
import InputPrice from "../components/InputPrice";
import { useWallet } from "hooks/useWallet";
import { getDateFromExpirationTime, toGwei } from "utils";
import Select from "components/Select";
import { selectExpirationDates } from "./MakeOffer";
import dayjs from "dayjs";

const offerDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const UpdateOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT, bidBalance } = useAppSelector((state) => state.nftdetails);
  const { currentItem } = useAppSelector((state) => state.checkout);

  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);

  useEffect(() => {
    getBalance().then((res) => setbalance(res ? res / 1000000000 : 0));
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "" || Number(price) === 0);
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
            {balance}
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-light">Bid Balance </span>
          <div className="flex items-center">
            1.25
            <IconEthereum width="20px" color="gray" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary">
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(offer)}
          onClick={() => {
            dispatch(setCheckout({ type: CheckoutType.UpdateOffer, item: currentItem, price: offer, expireTime: (dayjs().add(expirationTime?.value, "day").valueOf() / 1000).toFixed() }));
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
    <RightMenu title="Update Offer" footer={footer} onBack={onBack}>
      <InfoBox title="Updating an Offer" description={offerDescription} />
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
        {offer !== "" && balance >= offer && offer > bidBalance && (
          <span className="flex items-center gap-x-[5px] text-bodySm text-orange">
            <IconInfo width="17px" />
            {bidBalanceControl()} ETH will be automatically added your bid balance to place this bid.
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

export default UpdateOffer;
