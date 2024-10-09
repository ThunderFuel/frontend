/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconArrowRight, IconInfo, IconItems, IconMinus, IconOffer, IconPlus, IconWarning } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import RightMenu from "../components/RightMenu";
import CartItem from "../components/CartItem";
import { useWallet } from "hooks/useWallet";
import { getDateFromExpirationTime, toGwei } from "utils";
import Select, { ISelectOption } from "components/Select";
import InputEthereum from "components/InputEthereum";
import Balances from "../components/Balances";
import { toggleManageFundsModal } from "store/walletSlice";
import config from "config";

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

const MakeOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);

  const { getBalance, hasEnoughBalance, getBidBalance } = useWallet();
  const balance = getBalance();
  const [bidBalance, setBidBalance] = useState<number>(0);

  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isMultipleEdition, setIsMultipleEdition] = useState(false);

  function fetchBidBalance() {
    if (user.walletAddress === undefined) return;
    getBidBalance?.({ contractAddress: user.walletAddress, user: user })?.then((res) => {
      setBidBalance(res);
    });
  }

  useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, []);

  const isValidNumber = (price: any) => {
    return !(isNaN(Number(price)) || price === "" || Number(price) === 0);
  };

  const bidBalanceControl = () => {
    return <span className="font-bold whitespace-nowrap">{parseFloat((offer - bidBalance).toFixed(9))} ETH</span>;
  };

  const footer = (
    <div className="flex flex-col text-head6 font-spaceGrotesk text-white">
      <Balances balance={balance} onFetchBalance={fetchBalance} />
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary" onClick={() => dispatch(toggleManageFundsModal())}>
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(offer) || !hasEnoughBalance(balance, offer) ? true : isButtonDisabled}
          onClick={() => {
            setIsButtonDisabled(true);
            dispatch(
              setCheckout({
                type: CheckoutType.MakeOffer,
                price: offer,
                expireTime: expirationTime?.value,
                onCheckoutComplete: onBack,
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

  const InputCount = ({ onChange, remainingAmount }: any) => {
    const [value, setValue] = useState(1);
    const onUpdateValue = (number: number) => {
      const val = value + number;
      if (val < 1 || val > remainingAmount) {
        return false;
      }

      setValue(val);
      onChange(number === 1 ? "add" : "remove");
    };

    return (
      <div className="flex items-center text-white w-fit border border-white border-opacity-10 rounded-md">
        <h3 className="w-16 text-center text-h3 border-r border-r-white border-opacity-10 py-1">{value}</h3>
        <div className="flex flex-col items-center">
          <span className="cursor-pointer px-5 py-1 border-b border-b-white border-opacity-10" onClick={() => onUpdateValue(1)}>
            <IconPlus className={value >= remainingAmount ? "opacity-50" : ""} />
          </span>
          <span className="cursor-pointer px-5 py-1" onClick={() => onUpdateValue(-1)}>
            <IconMinus className={value <= 1 ? "opacity-50" : ""} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <RightMenu title="Make Offer" footer={footer} onBack={onBack}>
      <CartItem selectedNFT={selectedNFT} />
      <div className="flex flex-col gap-2">
        <h6 className="text-h6 text-white">{isMultipleEdition ? "Enter Price per Item*" : "Enter Price*"}</h6>
        <div className="flex gap-[5px] body-small text-gray-light">
          <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" />
          {config.getConfig("type") === "fuel" ? (
            <span>When you’re placing a bid required amount will be automatically added to your bid balance.</span>
          ) : (
            <span>If your offer is more than your bid balance, you will be prompted to convert your ETH into wETH in the following step.</span>
          )}
        </div>
        <InputEthereum maxLength="8" onChange={setoffer} value={offer} type="text" />
        {!hasEnoughBalance(offer) && offer !== "" && (
          <div className="flex w-full items-center gap-x-[5px] text-red">
            <IconWarning width="17px" />
            <span className="text-bodySm font-spaceGrotesk">You don`t have enough funds to make this offer.</span>
          </div>
        )}
        {!toGwei(offer).eq(0) && balance >= toGwei(offer) && offer > bidBalance && (
          <div className="flex items-center gap-x-[5px] text-bodySm text-orange font-spaceGrotesk">
            <IconInfo width="17px" />
            <span>{bidBalanceControl()} will be automatically added your bid balance to place this bid.</span>
          </div>
        )}
      </div>
      {isMultipleEdition && (
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h6 className="text-h6 text-white">Quantity*</h6>
            <div className="flex gap-[5px] text-gray-light">
              <IconItems className="w-[17px] h-[17px]" />
              <span className="text-bodySm font-spaceGrotesk">You`ve 2 editions available</span>
            </div>
          </div>
          <InputCount
            onChange={() => {
              console.log("inputcount");
            }}
          />
        </div>
      )}
      {/* <div className="flex flex-col gap-y-2 text-white text-h6 relative z-10">
        Set Expiration Date
        <div className="flex items-center gap-x-[5px] body-small text-gray-light">
          <IconInfo className="w-[17px] h-[17px]" />
          <span>Expires on </span> {getDateFromExpirationTime(expirationTime.value)}
        </div>
        <Select direction="top" options={selectExpirationDates} onChange={setexpirationTime} value={expirationTime} />
      </div> */}
    </RightMenu>
  );
};

export default MakeOffer;
