import React from "react";
import Table, { ITableHeader } from "components/Table";
import EthereumPrice from "components/EthereumPrice";
import Img from "components/Img";

import { IconDownRight, IconLoadingTable, IconSortDown, IconSortUp, IconUpRight } from "icons";
import clsx from "clsx";
import { useMarketplace } from "../MarketplaceContext";
import Favorite from "./components/Favorite";
import Footer from "./components/Footer";
import Collection from "./components/Collection";
import { Link } from "react-router-dom";
import { PATHS } from "router/config/paths";
import { getAbsolutePath } from "hooks/useNavigate";
import config from "../../../config";

const NftImages = React.memo(({ collectionItems }: { collectionItems: any[] }) => {
  const items = collectionItems.slice(0, 5);

  return (
    <ul className="px-4 flex gap-2">
      {items.map((item, i) => (
        <li key={i} className="w-14 h-14 overflow-hidden">
          <Link to={getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item.tokenId })}>
            {item.image ? <Img src={item.image} alt={i.toString()} className="rounded-md" /> : <div className="w-full h-full bg-gray rounded-md"></div>}
          </Link>
        </li>
      ))}
    </ul>
  );
});
NftImages.displayName = "NftImages";

const Change = ({ change }: { change: any }) => {
  const isNull = change === 0 || change === null;
  const text = !isNull ? `${change.toFixed(2)}%` : "-";
  const className = isNull ? "text-white" : change < 0 ? "text-red" : "text-green";

  return (
    <div className="flex items-center">
      <h5 className={clsx("text-h5", className)}>{text}</h5>
      {!isNull ? change < 0 ? <IconDownRight className={className} /> : <IconUpRight className={className} /> : <></>}
    </div>
  );
};
Change.displayName = "Change";

const MarketPlaceTableLoading = () => {
  return [1, 2, 3, 4, 5, 6].map((i, k) => (
    <div className="table-row-skeleton" key={`${i}_${k}`}>
      <IconLoadingTable className="w-full text-gray" />
    </div>
  ));
};

const SortHeaderIcon = ({ sortingType }: any) => {
  const isASC = sortingType === "ASC";
  const isDESC = sortingType === "DESC";

  return (
    <div className="flex flex-col gap-0.5">
      <IconSortUp className={isASC ? "text-white" : "text-gray-light"} />
      <IconSortDown className={isDESC ? "text-white" : "text-gray-light"} />
    </div>
  );
};

const SortHeader = ({ header, sortingValue, onChangeSortValue, sortingType }: any) => {
  const onClick = () => onChangeSortValue(header.sortValue);

  return (
    <div className={clsx("flex-center gap-1 cursor-pointer hover:text-white", sortingValue === header.sortValue && "text-white")} onClick={onClick}>
      {header.text}
      <SortHeaderIcon sortingType={sortingValue === header.sortValue ? sortingType : null} />
    </div>
  );
};
const MarketPlaceTable = ({ items = [] }: { items: any[] }) => {
  const { dayTabValue, addWatchList, isLoading, onChangeSortValue, sortingValue, sortingType, options } = useMarketplace();

  const headers: ITableHeader[] = [
    {
      key: "collection",
      text: "COLLECTION",
      render: (item) => <Collection image={item.image} title={item.collection} />,
    },
    {
      key: "volume",
      text: `VOLUME (${dayTabValue?.text})`,
      width: "10%",
      align: "flex-end",
      sortValue: 1,
      render: (item) => <EthereumPrice price={item.volume} />,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} />,
    },
    {
      key: "change",
      text: "CHANGE",
      width: "10%",
      align: "flex-end",
      render: (item) => <Change change={item.change} />,
    },
    {
      key: "floor",
      text: "FLOOR",
      width: "10%",
      align: "flex-end",
      sortValue: 2,
      render: (item) => <EthereumPrice price={item.floor} />,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} />,
    },
    {
      key: "sales",
      text: "SALES",
      width: "10%",
      align: "flex-end",
      sortValue: 3,
      render: (item) => <div className="cell text-h5">{item.sales}</div>,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} />,
    },
    {
      key: "lastSold",
      text: "LAST SOLD",
      render: (item) => <NftImages collectionItems={item.collectionItems} />,
      width: "350px",
    },
    {
      key: "favorite",
      text: "",
      width: "5%",
      align: "center",
      render: (item) => <Favorite item={item} onChange={onAddWatchList} />,
    },
  ];

  const onAddWatchList = async (data: any) => {
    await addWatchList(data);
  };
  const rowElementProps = (item: any) => {
    return { to: getAbsolutePath(PATHS.COLLECTION, { collectionId: config.isCollectionPathSlug() ? item.slug ?? item.id : item.id }) };
  };

  return (
    <Table
      loading={isLoading}
      loadingTemplate={MarketPlaceTableLoading}
      rowElementProps={rowElementProps}
      rowElement={Link}
      theadClassName={"sticky z-10"}
      theadStyle={{ top: "calc(var(--headerHeight) - 1px)" }}
      headers={headers}
      items={items}
      footer={!options.hideFooter ? items.length >= 10 ? <Footer /> : null : null}
    />
  );
};

export default MarketPlaceTable;
