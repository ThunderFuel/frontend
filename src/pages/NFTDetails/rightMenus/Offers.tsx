/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { IconCancel, IconClock, IconOffer, IconWarning } from "icons";
import RightMenu from "../components/RightMenu";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu, setYourCurrentOffer } from "store/NFTDetailsSlice";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import { useParams } from "react-router";
import EthereumPrice from "components/EthereumPrice";
import Avatar from "components/Avatar";
import { addressFormat, compareAddresses, dateFormat } from "utils";
import { toggleWalletModal } from "store/walletSlice";
import clsx from "clsx";
import userService from "api/user/user.service";
import useToast from "hooks/useToast";
import { ITableHeader } from "components/Table";
import dayjs from "dayjs";
import OfferTable from "components/OfferTable";
import { OfferStatus } from "api/offer/offer.type";

const Box = ({
  item,
  isExpired,
  ownOffer,
  isOwner,
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
  const formattedDate = dateFormat(item.expireTime, "DD MMM YYYY, HH:ss A Z");

  const Icon = item.isExpired || item.isCanceled ? IconWarning : IconClock;
  const description = item.isCanceled ? "Canceled" : item.isExpired ? "Expired" : `Expires on ${formattedDate}`;

  const isDisabled = item.isExpired || item.isCanceled;

  return (
    <div className={clsx("flex flex-col border border-gray rounded-lg text-h6", isDisabled ? "text-gray-light" : "text-white")}>
      <div className={`flex w-full p-[15px] gap-x-[15px]  ${isExpired ? "opacity-50" : ""}`}>
        <Avatar image={item?.userImage} userId={item?.makerUserId} className={"w-8 h-8 flex-shrink-0"} />
        <div className="flex flex-col gap-y-[10px]">
          <span>
            {ownOffer ? <span className="text-green">you</span> : item.makerUserName ?? addressFormat(item.makerAddress)} on {dateFormat(item.createdAt, "MMM DD, YYYY")}
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
            onClick={() => {
              userService.getBidBalance(item.makerUserId).then((res) => {
                if (res.data < item.price) useToast().error("Offer amount exceeds bidder`s available balance. Cannot be accepted until the balance is enough.");
                else {
                  dispatch(
                    setCheckout({
                      type: CheckoutType.AcceptOffer,
                      item: item,
                      price: item.price,
                      onCheckoutComplete: onBack,
                    })
                  );
                  dispatch(toggleCheckoutModal());
                }
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
            onClick={() => {
              dispatch(
                setCheckout({
                  type: CheckoutType.CancelOffer,
                  item: item,
                  onCheckoutComplete: onBack,
                })
              );
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
              dispatch(setYourCurrentOffer(item.price));
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

const headers: ITableHeader[] = [
  {
    key: "from",
    text: `From`,
    width: "25%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => (
      <span className="flex items-center gap-2.5">
        <Avatar className="w-8 h-8 rounded-full" image={null} userId={item.makerUserId} /> {addressFormat(item?.makerUserId)}
      </span>
    ),
  },
  {
    key: "price",
    text: "PRICE",
    width: "25%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item.price} priceClassName="text-h6" />,
  },
  {
    key: "floor-difference",
    text: "FLOOR DIFFERENCE",
    width: "25%",
    align: "flex-end",
    render: (item) => <span>-</span>,
  },
  {
    key: "expireTime",
    text: "DATE",
    width: "25%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => {
      return <OfferTable.OfferExpiredTime item={item} />;
    },
  },
];

const Offers = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
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
      createdAt: dayjs(item.createdAt).valueOf(),
      expireTime: dayjs(item.expireTime).valueOf(),
      isOfferMade: compareAddresses(item.makerUserId, user.id),
      showAfterRow: compareAddresses(item.makerUserId, user.id) || compareAddresses(selectedNFT.user.id, user.id),
    }));
    setOffers(data);
  };

  const MakeOfferButton = () => (
    <Button
      className="btn-sm btn-secondary mx-5"
      onClick={() => {
        if (!isConnected) dispatch(toggleWalletModal());
        else dispatch(setRightMenu(RightMenuType.MakeOffer));
      }}
    >
      MAKE OFFER <IconOffer className="w-[18px] h-[18px]" />
    </Button>
  );

  useEffect(() => {
    fetchOffers();
  }, [nftId]);

  return (
    <RightMenu title="Offers" onBack={onBack}>
      <OfferTable
        items={offers}
        headers={headers}
        onCancelOffer={(item: any) => {
          dispatch(
            setCheckout({
              type: CheckoutType.CancelOffer,
              item: item,
              price: item.price,
              onCheckoutComplete: onBack,
              cancelOrderIds: [item.id],
            })
          );
          dispatch(toggleCheckoutModal());
        }}
        onAcceptOffer={() => {
          dispatch(
            setCheckout({
              type: CheckoutType.AcceptOffer,
              item: {
                ...selectedNFT.bestOffer,
                contractAddress: selectedNFT.collection.contractAddress,
                makerAddress: selectedNFT.bestOffer?.user?.walletAddress,
                takerAddress: selectedNFT.user.walletAddress,
                tokenOrder: selectedNFT.tokenOrder,
                orderId: selectedNFT.tokenId,
              },
              price: selectedNFT.bestOffer?.price,
            })
          );
          dispatch(toggleCheckoutModal());
        }}
        onUpdateOffer={(item: any) => {
          dispatch(
            setCheckout({
              cancelOrderIds: [item.id],
            })
          );
          dispatch(setRightMenu(RightMenuType.UpdateOffer));
        }}
        // isProfile={}
        // getBidBalance={}
      />
    </RightMenu>
  );
};

export default Offers;
