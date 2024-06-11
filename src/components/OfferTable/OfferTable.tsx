import React from "react";
import Table, { ITableHeader } from "../Table/Table";
import EthereumPrice from "../EthereumPrice";
import { addressFormat, dateFormat } from "utils";
import LazyImg from "../LazyImg";
import Button from "../Button";
import { IconCircleRemoveWhite, IconClock, IconHand, IconOffer } from "../../icons";
import { getAbsolutePath } from "../../hooks/useNavigate";
import { PATHS } from "../../router/config/paths";
import { expiresInFormat } from "utils/timeago";
import clsx from "clsx";
import Tooltip from "components/Tooltip";

interface IOfferTable {
  isOffersMade?: boolean;
  headers?: any[];
  items: any[];
  onAcceptOffer?: any;
  onCancelOffer?: any;
  onUpdateOffer?: any;
  isProfile?: any;
  getBidBalance?: any;
  ButtonBelowHeader?: any;
}

const OfferItemAcceptButton = ({ item, onAcceptOffer }: any) => {
  return (
    <Button className="btn-secondary btn-sm w-full border-none no-bg !p-0" onClick={() => onAcceptOffer(item)}>
      accept offer <IconOffer className="w-[18px] h-[18px]" />
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
    <Tooltip position="top" hiddenArrow={true} content={dateFormat(item.expireTime, "MMM DD, HH:mm A Z")}>
      <span className={clsx("flex items-center gap-1 body-medium", item.isExpired ? "text-gray-light" : "text-white")}>
        {item.isExpired ? "Expired" : expiresInFormat(item?.expireTime)}
        <IconClock className="flex-shrink-0 w-4 h-4" />
      </span>
    </Tooltip>
  );
};
const OfferLabel = ({ children }: any) => {
  return <span className="body-medium">{children}</span>;
};

const defaultHeaders: ITableHeader[] = [
  {
    key: "item",
    text: `Item`,
    width: "40%",
    align: "flex-start",
    minWidth: "200px",
    sortValue: 1,
    render: (item) => {
      return <OfferCollectionItem item={item} />;
    },
  },
  {
    key: "topBid",
    text: "top bid",
    width: "30%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item?.price} priceClassName="text-h6" />,
  },
  {
    key: "quantity",
    text: `Quantity`,
    width: "30%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <OfferLabel>1</OfferLabel>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  // {
  //   key: "date",
  //   text: "expires",
  //   width: "20%",
  //   align: "flex-end",
  //   sortValue: 3,
  //   render: (item) => <OfferExpiredTime item={item} />,
  // },
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

const OfferTable = ({ headers, items, onAcceptOffer, onCancelOffer, onUpdateOffer, isProfile, getBidBalance, isOffersMade, ButtonBelowHeader }: IOfferTable) => {
  const afterRowParams = {
    onAcceptOffer,
    onCancelOffer,
    onUpdateOffer,
    isProfile,
    getBidBalance,
  };

  const getHeaders = React.useMemo(() => {
    if (headers) {
      return headers;
    }

    return defaultHeaders.map((header) => {
      return {
        ...header,
        text: header.key === "topBid" && isOffersMade ? "offer" : header.text,
      };
    });
  }, [isOffersMade]);

  return (
    <Table
      headers={getHeaders}
      items={items}
      containerFluidClassName={"lg:px-5"}
      ButtonBelowHeader={ButtonBelowHeader}
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
  OfferLabel,
});
