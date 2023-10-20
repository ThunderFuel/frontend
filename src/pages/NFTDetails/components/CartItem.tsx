import EthereumPrice from "components/EthereumPrice";
import { IconEthereum } from "icons";
import React from "react";
import { useAppSelector } from "store";
import { RightMenuType } from "store/NFTDetailsSlice";
import { formatPrice } from "utils";

const CartItem = ({ selectedNFT }: { selectedNFT: any }) => {
  const { rightMenuType, yourCurrentOffer } = useAppSelector((state) => state.nftdetails);

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
                {formatPrice(selectedNFT?.startingPrice) ?? "-"}
                <IconEthereum className="h-5 w-5 text-gray-light" />
              </div>
            </div>
          )}
          {selectedNFT.collection && (
            <div className="flex justify-between">
              <span className="text-gray-light">Floor Price</span>
              <div className="flex items-center text-white">
                {formatPrice(selectedNFT?.collection?.floor) ?? "-"}
                <IconEthereum className="h-5 w-5 text-gray-light" />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {selectedNFT?.onAuction
              ? selectedNFT.highestBid && (
                  <>
                    <span className="text-gray-light">Highest Bid</span>
                    <div className="flex text-orange">
                      <EthereumPrice price={selectedNFT.highestBid?.price} priceClassName="text-head6" />
                    </div>
                  </>
                )
              : selectedNFT.bestOffer && (
                  <>
                    <span className="text-gray-light">Best Offer</span>
                    <span className="flex text-orange">
                      <EthereumPrice price={selectedNFT.bestOffer?.price} priceClassName="text-head6" />
                    </span>
                  </>
                )}
          </div>
          {yourCurrentOffer !== "" && (
            <div className="flex justify-between">
              <span className="text-gray-light">Your Current Offer</span>
              <div className="flex items-center text-green">
                <EthereumPrice price={yourCurrentOffer} priceClassName="text-head6" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
