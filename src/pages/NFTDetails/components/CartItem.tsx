import { IconEthereum } from "icons";
import React from "react";
import { useAppSelector } from "store";
// import { AssetMockNFT1 } from "assets";
// import { IconEthereum } from "icons";

const CartItem = ({ selectedNFT }: { selectedNFT: any }) => {
  const { isOwner } = useAppSelector((state) => state.nftdetails);
  const userOffer = 0.88;

  return (
    <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
      <img src={selectedNFT.image} width="64px" className="rounded-[5px] h-fit"></img>
      <div className="flex flex-col w-full">
        <div className="pb-[11px] border-b border-gray">{selectedNFT.name}</div>
        <div className="flex flex-col pt-2 gap-y-2">
          <div className="flex justify-between">
            <span className="text-gray-light">Starting Price</span>
            <div className="flex items-center">
              {selectedNFT.startingPrice}
              <IconEthereum color="gray" width="20px" />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-light">Floor Price</span>
            <div className="flex items-center">
              {selectedNFT.collection.floor}
              <IconEthereum color="gray" width="20px" />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-light">{selectedNFT.onAuction ? "Highest Bid" : "Best Offer"}</span>
            <div className="flex items-center text-orange">
              {selectedNFT.onAuction ? selectedNFT.highestBid : selectedNFT.highestOffer}
              <IconEthereum width="20px" />
            </div>
          </div>
          {isOwner && (
            <div className="flex justify-between">
              <span className="text-gray-light">Your Current Offer</span>
              <div className="flex items-center text-green">
                {userOffer}
                <IconEthereum width="20px" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
