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
import Balances from "../components/Balances";
import userService from "api/user/user.service";
import { toggleManageFundsModal } from "store/walletSlice";

const UpdateOffer = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { cancelOrderIds } = useAppSelector((state) => state.checkout);
  const { user } = useAppSelector((state) => state.wallet);

  const { getBalance, hasEnoughBalance } = useWallet();
  const balance = getBalance();
  const [bidBalance, setBidBalance] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [offer, setoffer] = useState<any>("");
  const [expirationTime, setexpirationTime] = useState(selectExpirationDates[0]);

  function fetchBidBalance() {
    userService.getBidBalance(user.id).then((res) => setBidBalance(res.data ? res.data : 0));
  }
  useEffect(() => {
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
      <Balances />
      <div className="flex justify-end gap-x-3 px-5 py-5">
        <Button className="btn-secondary" onClick={() => dispatch(toggleManageFundsModal())}>
          ADD FUNDS <IconArrowRight />
        </Button>
        <Button
          disabled={!isValidNumber(offer) || !hasEnoughBalance(offer) ? true : isButtonDisabled}
          onClick={() => {
            setIsButtonDisabled(true);
            dispatch(
              setCheckout({
                type: CheckoutType.UpdateOffer,
                currentItemId: selectedNFT.id,
                cancelOrderIds: cancelOrderIds,
                onCheckoutComplete: () => {
                  dispatch(setCheckout({ item: {}, cancelOrderIds: [] }));
                  onBack();
                },
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
  const hasEnough = hasEnoughBalance(offer);

  return (
    <RightMenu title="Update Offer" footer={footer} onBack={onBack}>
      <CartItem selectedNFT={selectedNFT} />
      <div className="flex flex-col gap-y-2">
        <h6 className="text-head6 font-spaceGrotesk text-white">Your Offer</h6>
        <div className="flex gap-[5px] text-bodySm text-gray-light">
          <IconInfo className="flex-shrink-0 w-[17px] h-[17px]" />
          <span>If your offer is more than your bid balance, you will be prompted to convert your ETH into wETH in the following step. </span>
        </div>
        <InputPrice onChange={setoffer} value={offer} type="text" />
        {!hasEnoughBalance(offer) && offer !== "" && (
          <div className="flex w-full items-center gap-x-[5px] text-red">
            <IconWarning width="17px" />
            <span className="text-bodySm font-spaceGrotesk">You don`t have enough funds to make this offer.</span>
          </div>
        )}
        {!toGwei(offer).eq(0) && hasEnough && offer > bidBalance && (
          <div className="flex items-center gap-x-[5px] text-bodySm text-orange font-spaceGrotesk">
            <IconInfo width="17px" />
            <span>{bidBalanceControl()} will be automatically added your bid balance to place this bid.</span>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col gap-y-2 text-white font-spaceGrotesk">
        Set Expiration Date
        <div className="flex items-center gap-x-[5px] text-bodySm text-gray-light">
          <IconInfo className="w-[17px] h-[17px]" /> <span>Expires on </span> {getDateFromExpirationTime(expirationTime.value)}
        </div>
        <Select options={selectExpirationDates} onChange={setexpirationTime} value={expirationTime} />
      </div> */}
    </RightMenu>
  );
};

export default UpdateOffer;
