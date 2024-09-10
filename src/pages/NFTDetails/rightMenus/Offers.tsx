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
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { useIsMobile } from "hooks/useIsMobile";
import { ActivityTime } from "components/ActivityList/components/ActivityItems";
import { get } from "http";

const headers = (currentWalletAddress: any): ITableHeader[] => [
  {
    key: "from",
    text: `From`,
    width: "25%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => {
      const isOwner = compareAddresses(item.makerAddress, currentWalletAddress);

      return (
        <a href={getAbsolutePath(PATHS.USER, { userId: item.makerUserId })} className="flex text-h6 items-center gap-2.5">
          <Avatar className="w-8 h-8 rounded-full" image={null} userId={item.makerUserId} />
          <span className={isOwner ? "text-green" : "text-white"}>{isOwner ? "you" : addressFormat(item?.makerAddress)}</span>
        </a>
      );
    },
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
    key: "date",
    text: "date",
    width: "25%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => {
      return <ActivityTime item={{ ...item, createdTimeStamp: item.createdAt }} />;
    },
  },
];

const mobileHeaders: ITableHeader[] = [
  {
    key: "from",
    text: `From`,
    width: "25%",
    align: "flex-start",
    minWidth: "200px",
    className: "!bg-bg-light",
    sortValue: 1,
    render: (item) => {
      return (
        <a href={getAbsolutePath(PATHS.USER, { userId: item.makerUserId })} className="flex text-h6 items-center gap-2.5">
          <Avatar className="w-8 h-8 rounded-full" image={null} userId={item.makerUserId} /> {addressFormat(item?.makerAddress)}
        </a>
      );
    },
  },
  {
    key: "price",
    text: "PRICE",
    width: "35%",
    align: "flex-end",
    minWidth: "130px",

    className: "text-right !bg-bg-light",
    render: (item) => <EthereumPrice className="justify-end" price={item.price} priceClassName="text-h6" />,
  },
  {
    key: "floor-difference",
    text: "FLOOR",
    width: "35%",
    align: "flex-end",
    minWidth: "145px",
    className: "text-right !bg-bg-light px-5",
    render: (item) => <span>-</span>,
  },
];

const Offers = ({ onBack }: { onBack: any }) => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const { user, isConnected } = useAppSelector((state) => state.wallet);
  const { nftId } = useParams();
  const [offers, setOffers] = useState<any>([]);
  const isMobile = useIsMobile();

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
      MAKE OFFER <IconOffer className="w-[18px] h-[18px]" />
    </Button>
  );

  useEffect(() => {
    fetchOffers();
  }, [nftId]);

  function getHeaders() {
    const _headers = headers(user.walletAddress);

    return _headers;
  }

  return isMobile ? (
    <OfferTable
      items={offers}
      headers={mobileHeaders}
      ButtonBelowHeader={compareAddresses(selectedNFT.user.id, user.id) ? undefined : MakeOfferButton}
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
        dispatch(setYourCurrentOffer(item.price));
        dispatch(setRightMenu(RightMenuType.UpdateOffer));
      }}
      // isProfile={}
      // getBidBalance={}
    />
  ) : (
    <RightMenu title="Offers" onBack={onBack}>
      <OfferTable
        items={offers}
        headers={getHeaders()}
        ButtonBelowHeader={compareAddresses(selectedNFT.user.id, user.id) ? undefined : MakeOfferButton}
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
                tokenImage: selectedNFT.image,
              },
              price: selectedNFT.bestOffer?.price,
            })
          );
          dispatch(toggleCheckoutModal());
        }}
        onUpdateOffer={(item: any) => {
          dispatch(
            setCheckout({
              type: CheckoutType.UpdateOffer,
              currentItemId: selectedNFT.id,
              cancelOrderIds: [item.id],
              onCheckoutComplete: () => {
                dispatch(setCheckout({ item: {}, cancelOrderIds: [] }));
                onBack();
              },
            })
          );
          dispatch(toggleCheckoutModal());
        }}
        // isProfile={}
        // getBidBalance={}
      />
    </RightMenu>
  );
};

export default Offers;
