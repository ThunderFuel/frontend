import { IconEthereum } from "icons";
import React from "react";
import { useAppSelector } from "store";
import { RightMenuType } from "store/NFTDetailsSlice";

const CartItem = ({ selectedNFT }: { selectedNFT: any }) => {
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const { currentItem } = useAppSelector((state) => state.checkout);

  return (
    <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
      <img src={selectedNFT?.image} className="rounded-[5px] w-16 h-16"></img>
      <div className="flex flex-col w-full">
        <div className="pb-[11px] border-b border-gray">{selectedNFT?.name}</div>
        <div className="flex flex-col pt-2 gap-y-2">
          {rightMenuType === RightMenuType.PlaceBid && selectedNFT.startingPrice && (
            <div className="flex justify-between">
              <span className="text-gray-light">Starting Price</span>
              <div className="flex items-center text-white">
                {selectedNFT?.startingPrice ?? "-"}
                <IconEthereum className="h-5 w-5 text-gray-light" />
              </div>
            </div>
          )}
          {selectedNFT.collection && (
            <div className="flex justify-between">
              <span className="text-gray-light">Floor Price</span>
              <div className="flex items-center text-white">
                {selectedNFT?.collection?.floor ?? "-"}
                <IconEthereum className="h-5 w-5 text-gray-light" />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {selectedNFT?.onAuction
              ? selectedNFT.highestBid && (
                  <>
                    <span className="text-gray-light">Highest Bid</span>
                    <div className="flex items-center text-orange">
                      {selectedNFT?.highestBid?.price ?? "-"}
                      <IconEthereum className="h-5 w-5" />
                    </div>
                  </>
                )
              : selectedNFT.bestOffer && (
                  <>
                    <span className="text-gray-light">Best Offer</span>
                    <div className="flex items-center text-orange">
                      {selectedNFT?.bestOffer?.price ?? "-"}
                      <IconEthereum className="h-5 w-5" />
                    </div>
                  </>
                )}
          </div>
          {currentItem?.price !== 0 && (
            <div className="flex justify-between">
              <span className="text-gray-light">Your Current Offer</span>
              <div className="flex items-center text-green">
                {currentItem?.price ?? "-"}
                <IconEthereum className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
