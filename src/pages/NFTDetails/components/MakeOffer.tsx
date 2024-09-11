import React from "react";
import Button from "components/Button";
import { IconOffer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { toggleWalletModal } from "store/walletSlice";
import { compareAddresses } from "utils";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const MakeOffer = () => {
  const dispatch = useAppDispatch();
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const isOwner = () => {
    return compareAddresses(user?.id, selectedNFT?.user?.id);
  };

  return isOwner() ? (
    <></>
  ) : (
    <div className="flex flex-col p-5 rounded-md border border-gray bg-bg-light ">
      <Button
        className="btn-secondary no-bg"
        onClick={() => {
          if (!isConnected) dispatch(toggleWalletModal());
          else {
            dispatch(
              setCheckout({
                type: CheckoutType.MakeOffer,
                currentItemId: selectedNFT.id,
              })
            );
            dispatch(toggleCheckoutModal());
          }
        }}
      >
        MAKE OFFER <IconOffer />
      </Button>
    </div>
  );
};

export default MakeOffer;
