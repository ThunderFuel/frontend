import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconCancel, IconClock, IconOffer, IconWarning } from "icons";
import RightMenu from "../components/RightMenu";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { useParams } from "react-router";
import EthereumPrice from "components/EthereumPrice";
import Avatar from "components/Avatar";
import { addressFormat, dateFormat, toGwei } from "utils";
import { toggleWalletModal } from "store/walletSlice";
import offerService from "api/offer/offer.service";
import { OfferStatus } from "api/offer/offer.type";
import clsx from "clsx";
import { executeOrder, setContracts } from "thunder-sdk/src/contracts/thunder_exchange";
import { NativeAssetId, Provider } from "fuels";
import { ZERO_B256, contracts, exchangeContractId, provider, strategyFixedPriceContractId } from "global-constants";
import userService from "api/user/user.service";

const Box = ({
  item,
  isExpired,
  ownOffer,
  isOwner,
  fetchOffers,
  onBack,
  isAccepted,
}: {
  item: any;
  isExpired?: boolean;
  ownOffer?: boolean;
  isOwner: () => boolean;
  fetchOffers: any;
  onBack: any;
  isAccepted: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.wallet);
  const { show } = useAppSelector((state) => state.checkout);
  console.log(item);
  const formattedDate = dateFormat(item.expireTime, "DD MMM YYYY, HH:ss A Z");

  const Icon = item.isExpired || item.isCanceled ? IconWarning : IconClock;
  const description = item.isCanceled ? "Canceled" : item.isExpired ? "Expired" : `Expires on ${formattedDate}`;

  const isDisabled = item.isExpired || item.isCanceled;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!show) setIsButtonDisabled(false);
  }, [show]);

  return (
    <div className={clsx("flex flex-col border border-gray rounded-lg text-h6", isDisabled ? "text-gray-light" : "text-white")}>
      <div className={`flex w-full p-[15px] gap-x-[15px]  ${isExpired ? "opacity-50" : ""}`}>
        <Avatar image={item?.user?.image} userId={item?.user?.id} className={"w-8 h-8 flex-shrink-0"} />
        <div className="flex flex-col gap-y-[10px]">
          <span>
            {item.makerUserName ?? addressFormat(item.makerAddress)} on {dateFormat(item.createdAt, "MMM DD, YYYY")}
          </span>
          <div className="flex items-center p-[6px] gap-x-1 border text-bodyMd border-gray rounded-[5px]">
            <Icon className="w-[15px] h-[15px] flex-shrink-0" />
            {description}
          </div>
        </div>
        <div className="flex h-fit grow justify-end">
          <EthereumPrice price={item.price} priceClassName="text-h6" />
        </div>
      </div>
      {isOwner() && !isExpired && !isAccepted && (
        <div className="flex border-t border-gray">
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            disabled={isButtonDisabled}
            onClick={() => {
              setIsButtonDisabled(true);
              offerService.getOffersIndex([item.id]).then((res) => {
                const order = {
                  isBuySide: false,
                  taker: item.takerAddress,
                  maker: item.makerAddress,
                  nonce: res.data[item.id],
                  price: toGwei(item.price),
                  collection: item.contractAddress,
                  token_id: item.tokenOrder,
                  strategy: strategyFixedPriceContractId,
                  extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 }, // laim degilse null
                };

                const prov = new Provider("https://beta-3.fuel.network/graphql");
                setContracts(contracts, prov);

                console.log(order);
                executeOrder(exchangeContractId, provider, wallet, order, NativeAssetId).then((res) => {
                  console.log(res);
                  if (res.transactionResult.status.type === "success") {
                    offerService.acceptOffer({ id: item.id }).then(() => {
                      setIsButtonDisabled(false);
                      userService.updateBidBalance(item.makerUserId, -item.price);
                      fetchOffers();
                      onBack();
                    });
                  }
                });
              });
            }}
          >
            ACCEPT OFFER
            <IconOffer width="18px" />
          </Button>
        </div>
      )}
      {ownOffer && !isExpired && (
        <div className="flex border-t border-gray">
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            disabled={isButtonDisabled}
            onClick={() => {
              setIsButtonDisabled(true);
              dispatch(setCheckout({ type: CheckoutType.CancelOffer, item: item }));
              dispatch(toggleCheckoutModal());
            }}
          >
            CANCEL OFFER
            <IconCancel width="18px" />
          </Button>
          <div className="flex border-r border-gray"></div>
          <Button
            className="btn w-full btn-sm no-bg border-none text-white"
            onClick={() => {
              dispatch(setCheckout({ item: item }));
              dispatch(setRightMenu(RightMenuType.UpdateOffer));
            }}
          >
            UPDATE OFFER
            <IconOffer width="18px" />
          </Button>
        </div>
      )}
    </div>
  );
};

const Offers = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const isOwner = () => {
    return user.id === selectedNFT.user.id;
  };

  const { nftId } = useParams();
  const [offers, setOffers] = useState<any>([]);

  const fetchOffers = async () => {
    const response = await nftdetailsService.getOffers({ tokenId: selectedNFT.id, page: 1, pageSize: 10 });
    const data = response.data.map((item: any) => ({
      ...item,
      isActiveOffer: item.status === OfferStatus.ActiveOffer,
      isExpired: item.status === OfferStatus.ExpiredOffer,
      isCanceled: item.status === OfferStatus.Cancelled,
      isAccepted: item.status === OfferStatus.AcceptedOffer,
    }));
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, [nftId]);

  return (
    <RightMenu title="Offers" onBack={onBack}>
      {!isOwner() && (
        <Button
          className="btn-secondary no-bg"
          onClick={() => {
            if (!isConnected) dispatch(toggleWalletModal());
            else dispatch(setRightMenu(RightMenuType.MakeOffer));
          }}
        >
          MAKE OFFER <IconOffer />
        </Button>
      )}
      {offers.map((offer: any, index: any) => {
        if (offer.isCanceled) {
          return <></>;
        }

        return (
          <Box
            item={offer}
            key={index}
            isOwner={isOwner}
            ownOffer={user.id === offer?.makerUserId && offer.isActiveOffer}
            fetchOffers={fetchOffers}
            onBack={onBack}
            isExpired={offer.isExpired}
            isAccepted={offer.isAccepted}
          />
        );
      })}
    </RightMenu>
  );
};

export default Offers;
