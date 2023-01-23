import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconEthereum, IconInfo, IconOffer, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import InfoBox from "../components/InfoBox";
import CartItem from "../components/CartItem";
import PriceInput from "../components/PriceInput";
import Dropdown from "components/Dropdown";
import { useWallet } from "hooks/useWallet";
import { getDateFromExpirationTime, substract } from "utils";

const offerDescription =
  "When you’re placing a bid you need to add funds to your bid balance. Required amount will be automatically added to your bid balance. You can withdraw your bid balance anytime.";

const MakeOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT, bidBalance } = useAppSelector((state) => state.nftdetails);

  const { getBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState("1 day");

  useEffect(() => {
    getBalance().then((res) => setbalance(res ? res / 1000000000 : 0));
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "");
  };

  const handleChange = (event: React.ChangeEvent<any>, name: string) => {
    const newValue = event.target.value;
    const lastChar = newValue.substring(newValue.length - 1);

    switch (name) {
      case "price":
        if (newValue.match(/^(0*[1-9]\d*|0*[1-9]\d*\.\d+|0*\.\d+|0+)$/)) {
          setoffer(lastChar === "0" ? newValue : +newValue);
        } else if (lastChar === "." && !newValue.substring(0, newValue.length - 1).includes(".")) setoffer(newValue);
        else if (newValue === "") setoffer(newValue);
        break;
      case "expiration":
        setexpirationTime(newValue);
        break;
    }
  };

  const bidBalanceControl = () => {
    if (offer > balance) return;

    return offer > bidBalance && substract(offer, bidBalance);
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
          disabled={isValidNumber(offer) ? offer > balance : true}
          onClick={() => {
            dispatch(setCheckout({ type: "MakeOffer", price: offer }));
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
        <PriceInput onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event, "price")} value={offer} type="text" />
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
          <IconInfo width="17px" /> <span>Expires on </span> {getDateFromExpirationTime(expirationTime)}
        </div>
        <Dropdown
          options={["1 day", "3 days", "7 days", "1 month", "3 months", "6 months"]}
          onSelect={(event: any) => handleChange(event, "expiration")}
          className="bg-bg-light text-bodyMd text-white"
        />
      </div>
    </RightMenu>
  );
};

export default MakeOffer;
