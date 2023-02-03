import nftdetailsService from "api/nftdetails/nftdetails.service";
import { IconEthereum } from "icons";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { RightMenuType } from "store/NFTDetailsSlice";

const CartItem = ({ selectedNFT }: { selectedNFT: any }) => {
  const { rightMenuType } = useAppSelector((state) => state.nftdetails);
  const { address } = useAppSelector((state) => state.wallet);
  const [currentUserOffer, setcurrentUserOffer] = useState<any>(null);

  const fetchOffers = async () => {
    const response = await nftdetailsService.getOffers({ tokenId: selectedNFT.id, userId: address });
    setcurrentUserOffer(response.data);
  };
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="flex border border-gray gap-x-[18px] p-[10px] text-head6 font-spaceGrotesk text-white rounded-md">
      <img src={selectedNFT.image} width="64px" className="rounded-[5px] h-fit"></img>
      <div className="flex flex-col w-full">
        <div className="pb-[11px] border-b border-gray">{selectedNFT.name}</div>
        <div className="flex flex-col pt-2 gap-y-2">
          {rightMenuType === RightMenuType.PlaceBid && (
            <div className="flex justify-between">
              <span className="text-gray-light">Starting Price</span>
              <div className="flex items-center">
                {selectedNFT.startingPrice}
                <IconEthereum color="gray" width="20px" />
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-light">Floor Price</span>
            <div className="flex items-center">
              {selectedNFT.collection.floor}
              <IconEthereum color="gray" width="20px" />
            </div>
          </div>

          <div className="flex justify-between">
            {selectedNFT.onAuction ? (
              <>
                <span className="text-gray-light">Highest Bid</span>
                <div className="flex items-center text-orange">
                  {selectedNFT.highestBid.price}
                  <IconEthereum width="20px" />
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-light">Best Offer</span>
                <div className="flex items-center text-orange">
                  {selectedNFT.bestOffer?.price}
                  <IconEthereum width="20px" />
                </div>
              </>
            )}
          </div>
          {currentUserOffer !== null && (
            <div className="flex justify-between">
              <span className="text-gray-light">Your Current Offer</span>
              <div className="flex items-center text-green">
                {currentUserOffer}
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
