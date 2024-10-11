import React from "react";
import Table, { ITableHeader } from "../Table/Table";
import EthereumPrice from "../EthereumPrice";
import { addressFormat, dateFormat } from "utils";
import LazyImg from "../LazyImg";
import Button from "../Button";
import { IconCircleCheck, IconCircleRemoveWhite, IconClock, IconHand, IconLink, IconOffer, IconWarning } from "../../icons";
import { getAbsolutePath } from "../../hooks/useNavigate";
import { PATHS } from "../../router/config/paths";
import { expiresInFormat } from "utils/timeago";
import clsx from "clsx";
import Tooltip from "components/Tooltip";
import { OfferStatus } from "api/offer/offer.type";
import Img from "../Img/Img";
import { Link } from "react-router-dom";
import { useAccount } from "@fuels/react";
import { useAppSelector } from "store";
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
  rowKey?: any;
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
    <div className="flex group w-full items-center gap-2.5">
      <Link to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item.id })} className={clsx("relative min-w-[40px] max-w-[40px] aspect-square rounded-md overflow-hidden flex-center bg-gray")}>
        <LazyImg className={clsx(!item.isActiveOffer ? "opacity-50" : "", "w-10 h-10 rounded-md")} src={item?.tokenImage} />
        <div className="absolute top-0 left-0 bottom-0 right-0 flex-center bg-gray/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <IconLink className="cursor-pointer text-white" />
        </div>
      </Link>
      <h6 className={clsx(!item.isActiveOffer ? "text-gray-light" : "text-white", "text-h6")}>{item?.tokenName ?? "-"}</h6>
    </div>
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
const OfferLabel = ({ children, className }: any) => {
  return <span className={clsx("body-medium", className)}>{children}</span>;
};

const OfferStatusProvider = ({ status }: { status: OfferStatus }) => {
  switch (status) {
    case OfferStatus.Cancelled:
      return (
        <div className="flex items-center gap-[5px] text-red">
          <span className="text-bodyMd text-overflow">Cancelled</span>
          <IconWarning className="w-[15px] h-[15px]" />
        </div>
      );
    case OfferStatus.ActiveOffer:
      return (
        <div className="flex items-center gap-[5px] text-white">
          <span className="text-bodyMd text-overflow">Active</span>
          <IconClock className="w-[15px] h-[15px]" />
        </div>
      );
    case OfferStatus.AcceptedOffer:
      return (
        <div className="flex items-center gap-[5px] text-green">
          <span className="text-bodyMd text-overflow">Accepted</span>
          <IconWarning className="w-[15px] h-[15px]" />
        </div>
      );

    case OfferStatus.ExpiredOffer:
      return (
        <div className="flex items-center gap-[5px] text-orange">
          <span className="text-bodyMd text-overflow">Expired</span>
          <IconClock className="w-[15px] h-[15px]" />
        </div>
      );

    default:
      return <></>;
  }
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
    width: "20%",
    align: "flex-end",
    render: (item) => <EthereumPrice price={item?.price} className={!item.isActiveOffer ? "text-gray-light" : ""} priceClassName="text-h6" />,
  },
  {
    key: "quantity",
    text: `Quantity`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => <OfferLabel className={!item.isActiveOffer ? "text-gray-light" : ""}>1</OfferLabel>,
    // renderHeader: (header) => <span>asasas</span>,
  },
  {
    key: "status",
    text: `Status`,
    width: "20%",
    align: "flex-end",
    sortValue: 1,
    render: (item) => (
      <OfferLabel>
        <OfferStatusProvider status={item.status} />
      </OfferLabel>
    ),
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

const OfferTable = ({ headers, items, onAcceptOffer, onCancelOffer, onUpdateOffer, isProfile, getBidBalance, isOffersMade, ButtonBelowHeader, rowKey }: IOfferTable) => {
  const afterRowParams = {
    onAcceptOffer,
    onCancelOffer,
    onUpdateOffer,
    isProfile,
    getBidBalance,
  };

  const { account } = useAccount();
  const { user } = useAppSelector((state) => state.wallet);

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
      rowKey={rowKey}
      afterRow={(item: any) => {
        if (item.ownerId === user.id) {
          return null;
        }
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
