import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAccept, IconOffer } from "icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";

const BestOffer = () => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user } = useAppSelector((state) => state.wallet);
  const isOwner = () => {
    return user?.id === selectedNFT?.user?.id;
  };

  return (
    <div className="flex flex-col border border-gray rounded-md bg-gray">
      <div className="flex justify-between bg-bg-light mb-[1px] p-5">
        <div className="flex flex-col gap-y-[5px]">
          <span className="text-headlineMd font-bigShoulderDisplay text-gray-light">BEST OFFER</span>
          <span className="flex font-spaceGrotesk text-white">
            <EthereumPrice price={selectedNFT.bestOffer?.price} priceClassName="text-head3"></EthereumPrice>
          </span>
        </div>
        <div className="flex h-fit items-center gap-x-[5px]"></div>
      </div>
      <div className="flex flex-col bg-bg-light rounded-b p-5">
        {isOwner() ? (
          <Button
            className="w-full gap-x-[6px] text-button font-bigShoulderDisplay"
            onClick={() => {
              dispatch(setCheckout({ type: CheckoutType.AcceptOffer, price: selectedNFT.bestOffer?.price, item: { id: selectedNFT.bestOffer?.id, price: selectedNFT.bestOffer?.price } }));
              dispatch(toggleCheckoutModal());
            }}
          >
            ACCEPT OFFER
            <IconAccept />
          </Button>
        ) : (
          <Button
            className="btn-secondary no-bg "
            onClick={() => {
              dispatch(setRightMenu(RightMenuType.MakeOffer));
            }}
          >
            MAKE OFFER <IconOffer />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BestOffer;
