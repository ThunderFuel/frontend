import React from "react";
import Table, { ITableHeader } from "components/Table";
import EthereumPrice from "components/EthereumPrice";

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
import NftImages from "./components/NftImages";
import { useIsMobile } from "hooks/useIsMobile";

const Change = ({ change }: { change: any }) => {
  const isNull = change === 0 || change === null;
  const text = !isNull ? `${change.toFixed(2)}%` : "-";
  const className = isNull ? "text-white" : change < 0 ? "text-red" : "text-green";

  return (
    <div className="flex items-center lg:justify-start justify-end">
      <h5 className={clsx("text-h6 lg:text-h5", className)}>{text}</h5>
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

const SortHeader = ({ header, sortingValue, onChangeSortValue, sortingType, sortingDisabled }: any) => {
  const onClick = () => onChangeSortValue(header.sortValue);

  return (
    <div
      className={clsx(
        "flex items-center lg:justify-center justify-end gap-1 cursor-pointer hover:text-white",
        sortingValue === header.sortValue && "text-white",
        sortingDisabled ? "pointer-events-none" : ""
      )}
      onClick={onClick}
    >
      {header.text}
      {!sortingDisabled && <SortHeaderIcon sortingType={sortingValue === header.sortValue ? sortingType : null} />}
    </div>
  );
};
const MarketPlaceTable = ({ items = [] }: { items: any[] }) => {
  const isMobile = useIsMobile();
  const { dayTabValue, addWatchList, isLoading, onChangeSortValue, sortingValue, sortingType, options } = useMarketplace();

  const headers: ITableHeader[] = [
    {
      key: "collection",
      text: "COLLECTION",
      minWidth: "200px",
      render: (item) => (
        <Collection image={item.image} title={item.collection}>
          {isMobile && <Favorite item={item} onChange={onAddWatchList} />}
        </Collection>
      ),
    },
    {
      key: "volume",
      text: `VOLUME (${dayTabValue?.text})`,
      width: "10%",
      align: "flex-end",
      minWidth: "150px",
      sortValue: 1,
      className: "text-right",
      render: (item) => <EthereumPrice price={item.volume} className="justify-end" />,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} />,
    },
    // {
    //   key: "change",
    //   text: "CHANGE",
    //   width: "10%",
    //   align: "flex-end",
    //   className: "text-right",
    //   render: (item) => <Change change={item.change} />,
    // },
    {
      key: "floor",
      text: "FLOOR",
      width: "10%",
      align: "flex-end",
      minWidth: "150px",
      sortValue: 2,
      className: "text-right",
      render: (item) => <EthereumPrice price={item.floor} className="justify-end lg:justify-start" />,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} sortingDisabled={true} />,
    },
    {
      key: "sales",
      text: "SALES",
      width: "10%",
      align: "flex-end",
      className: "text-right",
      sortValue: 3,
      render: (item) => <Table.Cell>{item.sales}</Table.Cell>,
      renderHeader: (header) => <SortHeader header={header} sortingValue={sortingValue} onChangeSortValue={onChangeSortValue} sortingType={sortingType} />,
    },
    {
      key: "lastSold",
      text: "LAST SOLD",
      render: (item) => <NftImages collectionItems={item.collectionItems} />,
      width: "350px",
      minWidth: "200px",
    },
    {
      key: "favorite",
      text: "",
      width: "5%",
      align: "center",
      render: (item) => <Favorite item={item} onChange={onAddWatchList} />,
      isHidden: isMobile,
    },
  ];

  const onAddWatchList = async (data: any) => {
    await addWatchList(data);
  };
  const rowElementProps = (item: any) => {
    return { to: getAbsolutePath(PATHS.COLLECTION, { collectionId: config.isCollectionPathSlug() ? item.slug ?? item.id : item.id }) };
  };

  return (
    <div className="py-5 lg:py-0">
      <Table
        loading={isLoading}
        loadingTemplate={MarketPlaceTableLoading}
        rowElementProps={rowElementProps}
        rowElement={Link}
        theadClassName={"lg:sticky z-10"}
        theadStyle={{ top: "calc(var(--headerHeight) - 1px)" }}
        headers={headers}
        items={items}
        footer={!options.hideFooter ? items.length >= 10 ? <Footer /> : null : null}
      />
    </div>
  );
};

export default MarketPlaceTable;
