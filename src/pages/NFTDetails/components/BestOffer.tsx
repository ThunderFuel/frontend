import offerService from "api/offer/offer.service";
import Button from "components/Button";
import EthereumPrice from "components/EthereumPrice";
import { IconAccept, IconOffer } from "icons";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { toggleWalletModal } from "store/walletSlice";
import { executeOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { ZERO_B256, contracts, exchangeContractId, provider, strategyFixedPriceContractId } from "global-constants";
import { NativeAssetId, Provider } from "fuels";
import userService from "api/user/user.service";
import { toGwei } from "utils";

const BestOffer = ({ fetchCollection }: { fetchCollection: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected, wallet } = useAppSelector((state) => state.wallet);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
            disabled={isButtonDisabled}
            className="w-full gap-x-[6px] text-button font-bigShoulderDisplay"
            onClick={() => {
              setIsButtonDisabled(true);
              offerService.getOffersIndex([selectedNFT?.bestOffer?.id]).then((res) => {
                const order = {
                  isBuySide: false,
                  taker: user.walletAddress,
                  maker: selectedNFT.bestOffer.user.walletAddress,
                  nonce: res.data[selectedNFT?.bestOffer?.id],
                  price: toGwei(selectedNFT?.bestOffer?.price),
                  collection: selectedNFT.collection.contractAddress,
                  token_id: selectedNFT.tokenOrder,
                  strategy: strategyFixedPriceContractId,
                  extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // lazim degilse null
                };

                const prov = new Provider("https://beta-3.fuel.network/graphql");
                setContracts(contracts, prov);

                console.log(order);
                executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId).then((res) => {
                  console.log(res);
                  if (res.transactionResult.status.type === "success") {
                    offerService.acceptOffer({ id: selectedNFT?.bestOffer?.id }).then(() => {
                      userService.updateBidBalance(selectedNFT.bestOffer?.makerUserId, -selectedNFT.bestOffer?.price);
                      setIsButtonDisabled(false);
                      fetchCollection();
                    });
                  }
                });
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
              else dispatch(setRightMenu(RightMenuType.MakeOffer));
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
