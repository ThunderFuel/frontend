import React from "react";
import Table, { ITableHeader } from "../Table/Table";
import EthereumPrice from "../EthereumPrice";
import { addressFormat, timeagoFormat } from "utils";
import LazyImg from "../LazyImg";
import Button from "../Button";
import { IconCircleRemoveWhite, IconClock, IconHand, IconLikeHand } from "../../icons";
import { getAbsolutePath } from "../../hooks/useNavigate";
import { PATHS } from "../../router/config/paths";

interface IOfferTable {
  headers?: any[];
  items: any[];
  onAcceptOffer?: any;
  onCancelOffer?: any;
  onUpdateOffer?: any;
  isProfile?: any;
  getBidBalance?: any;
}

const OfferItemAcceptButton = ({ item, onAcceptOffer }: any) => {
  return (
    <Button className="btn-secondary btn-sm w-full" onClick={() => onAcceptOffer(item)}>
      accept offer <IconLikeHand />
    </Button>
  );
};
const OfferItemOnHold = () => {
  return (
    <div className="flex-center px-4 py-3 gap-1.5 border border-gray rounded-md bg-gray text-gray-light">
      <span className="text-headline-02">ON HOLD</span>
      <IconHand className="w-[18px] h-[18px]" />
    </div>
  );
};
const OfferItemUpdateButtons = ({ item, onCancelOffer, onUpdateOffer }: any) => {
  return (
    <div className="grid grid-cols-2">
      <Button
        className="btn-secondary btn-sm border-r-0 rounded-r-none"
        onClick={() => {
          onCancelOffer(item);
        }}
      >
        cancel offer <IconCircleRemoveWhite />
      </Button>
      <Button className="btn-secondary btn-sm rounded-l-none" onClick={() => onUpdateOffer(item)}>
        update offer <IconHand />
      </Button>
    </div>
  );
};
const OfferCollectionItem = ({ item }: any) => {
  return (
    <a href={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item.tokenId })} className="flex w-full items-center gap-2.5">
      <LazyImg className="w-10 h-10 rounded-md" src={item?.tokenImage} />
      <h6 className="text-h6 text-white">{item?.tokenName ?? "-"}</h6>
    </a>
  );
};

const OfferExpiredTime = ({ item }: any) => {
  return (
    <span className="flex items-center gap-1 body-medium">
      {timeagoFormat(item?.expireTime)}
      <IconClock className="flex-shrink-0 w-4 h-4" />
    </span>
  );
};

const defaultHeaders: ITableHeader[] = [
  {
    key: "item",
    text: `Item`,
    width: "20%",
    align: "flex-start",
    sortValue: 1,
    render: (item) => {
      return <OfferCollectionItem item={item} />;
    },
  },
  {
    key: "price",
    text: "PRICE",
    width: "20%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item?.price} priceClassName="text-h6" />,
  },
  {
    key: "quantity",
    text: `Quantity`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.takerUserId, 1)}</span>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "to",
    text: `TO`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <span>{addressFormat(item?.makerUserId, 1)}</span>,
  },
  {
    key: "date",
    text: "DATE",
    width: "20%",
    align: "flex-end",
    sortValue: 3,
    render: (item) => <OfferExpiredTime item={item} />,
  },
];

const usersBidBalance = {} as any;
const AfterRow = ({ item, onAcceptOffer, onCancelOffer, onUpdateOffer, getBidBalance }: any) => {
  const [offerOwnerBidBalance, setOfferOwnerBidBalance] = React.useState(usersBidBalance[item.makerUserId]);
  const fetchBidBalance = async () => {
    try {
      const response = await getBidBalance(item.makerUserId);
      usersBidBalance[item.makerUserId] = response.data;

      setOfferOwnerBidBalance(usersBidBalance[item.makerUserId]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    if (!item.isOfferMade && !usersBidBalance[item.makerUserId]) {
      fetchBidBalance();
    }
  }, []);

  if (offerOwnerBidBalance < item.price && !item.isOfferMade) {
    return <OfferItemOnHold />;
  }
  if (!item.isOfferMade) {
    return <OfferItemAcceptButton onAcceptOffer={onAcceptOffer} item={item} />;
  }

  return <OfferItemUpdateButtons onCancelOffer={onCancelOffer} onUpdateOffer={onUpdateOffer} item={item} />;
};

const OfferTable = ({ headers, items, onAcceptOffer, onCancelOffer, onUpdateOffer, isProfile, getBidBalance }: IOfferTable) => {
  const afterRowParams = {
    onAcceptOffer,
    onCancelOffer,
    onUpdateOffer,
    isProfile,
    getBidBalance,
  };

  return (
    <Table
      headers={headers ?? defaultHeaders}
      items={items}
      containerFluidClassName={"!px-5"}
      afterRow={(item: any) => {
        if (!item.isActiveOffer || !item.showAfterRow) {
          return null;
        }

        return <AfterRow item={item} {...afterRowParams} />;
      }}
    />
  );
};

export default Object.assign(OfferTable, {
  OfferCollectionItem,
  OfferExpiredTime,
});
