import React from "react";
import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAccept, IconOffer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { toggleWalletModal } from "store/walletSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import useToast from "hooks/useToast";
import userService from "api/user/user.service";
import { compareAddresses } from "utils";

const BestOffer = ({ fetchCollection }: { fetchCollection: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);

  const isOwner = () => {
    return compareAddresses(user?.id, selectedNFT?.user?.id);
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
              userService.getBidBalance(selectedNFT?.bestOffer?.makerUserId).then((res) => {
                if (res.data < selectedNFT?.bestOffer?.price) useToast().error("Offer amount exceeds bidder`s available balance. Cannot be accepted until the balance is enough.");
                else {
                  dispatch(
                    setCheckout({
                      type: CheckoutType.AcceptOffer,
                      item: {
                        ...selectedNFT.bestOffer,
                        contractAddress: selectedNFT.collection.contractAddress,
                        makerAddress: selectedNFT.bestOffer.user.walletAddress,
                        takerAddress: selectedNFT.user.walletAddress,
                        tokenOrder: selectedNFT.tokenOrder,
                        tokenImage: selectedNFT.image,
                      },
                      price: selectedNFT.bestOffer?.price,
                      onCheckoutComplete: fetchCollection,
                    })
                  );
                  dispatch(toggleCheckoutModal());
                }
              });
            }}
          >
            ACCEPT OFFER
            <IconAccept />
          </Button>
        ) : (
          <Button
            className="btn-secondary no-bg "
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
        )}
      </div>
    </div>
  );
};

export default BestOffer;
