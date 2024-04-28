import React from "react";
import { ActivityFilters } from "api/collections/collections.service";
import { addressFormat, compareAddresses, timeagoFormat } from "utils";
import { useAppSelector } from "store";
import { renderToString } from "react-dom/server";
import EthereumPrice from "components/EthereumPrice/EthereumPrice";

interface IActivityItemDescription {
  activityType: number;
  fromUserContractAddress: string;
  createdTimeStamp: number;
  toUserContractAddress: string;
  price?: string;
  noTime?: boolean;
}

const ActivityItemDescription = React.memo(({ price, activityType, fromUserContractAddress, toUserContractAddress, createdTimeStamp, noTime = false }: IActivityItemDescription) => {
  const { user } = useAppSelector((state) => state.wallet);
  let activeTypeLabel = `${ActivityFilters[activityType]} by`;
  if (price) {
    if (ActivityFilters.Listings === activityType) {
      activeTypeLabel = `${renderToString(
        <div className="inline-block">
          <EthereumPrice iconClassName="h-[20px] w-[20px]" price={price} priceClassName="text-head6" />
        </div>
      )}list by`;
    }
    if (ActivityFilters.ListingCancel === activityType) {
      activeTypeLabel = `${renderToString(
        <div className="inline-block">
          <EthereumPrice iconClassName="h-[20px] w-[20px]" price={price} priceClassName="text-head6" />
        </div>
      )}listing canceled by`;
    }
    if (ActivityFilters.Offers === activityType) {
      activeTypeLabel = `${renderToString(
        <div className="inline-block">
          <EthereumPrice iconClassName="h-[20px] w-[20px]" price={price} priceClassName="text-head6" />
        </div>
      )}offer made by`;
    }
    if (ActivityFilters.OfferCancel === activityType) {
      activeTypeLabel = `${renderToString(
        <div className="inline-block">
          <EthereumPrice iconClassName="h-[20px] w-[20px]" price={price} priceClassName="text-head6" />
        </div>
      )}offer canceled by`;
    }
    if (ActivityFilters.Sales === activityType) {
      activeTypeLabel = `${renderToString(
        <div className="inline-block">
          <EthereumPrice iconClassName="h-[18px] w-[18px]" price={price} priceClassName="text-head6" />
        </div>
      )}sale by`;
    }
    if (ActivityFilters.Transfers === activityType) {
      activeTypeLabel = `Transferred by`;
    }
    if (ActivityFilters.Mints === activityType) {
      activeTypeLabel = `Minted by`;
    }

    const fromUserContractAddressLabel = compareAddresses(user.walletAddress, fromUserContractAddress) ? "you" : addressFormat(fromUserContractAddress);

    let text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel}</span>`;

    text = text.replace(/you/, "<span class='text-green'>you</span>");

    return <div className="w-full text-head6" dangerouslySetInnerHTML={{ __html: text }} />;
  } else {
    if (ActivityFilters.Listings === activityType) {
      activeTypeLabel = `Listed by`;
    }
    if (ActivityFilters.ListingCancel === activityType) {
      activeTypeLabel = `Listing canceled by`;
    }
    if (ActivityFilters.Offers === activityType) {
      activeTypeLabel = `Offer made by`;
    }
    if (ActivityFilters.Sales === activityType) {
      activeTypeLabel = `Sold by`;
    }
    if (ActivityFilters.Transfers === activityType) {
      activeTypeLabel = `Transferred by`;
    }
    if (ActivityFilters.Mints === activityType) {
      activeTypeLabel = `Minted by`;
    }

    const fromUserContractAddressLabel = compareAddresses(user.walletAddress, fromUserContractAddress) ? "you" : addressFormat(fromUserContractAddress);
    const toUserContractAddressLabel = compareAddresses(user.walletAddress, toUserContractAddress) ? "you" : addressFormat(toUserContractAddress);

    let text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel} to ${toUserContractAddressLabel}</span>, ${!noTime ? timeagoFormat(createdTimeStamp) : ""}`;
    if ([ActivityFilters.Listings, ActivityFilters.Offers, ActivityFilters.Mints, ActivityFilters.Transfers].includes(activityType)) {
      text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel}</span>${!noTime ? ", " + timeagoFormat(createdTimeStamp) : ""}`;
    }

    // text = text.replace(",", "<span class='text-gray-light'>,</span>");
    text = text.replace(/you/, "<span class='text-green'>you</span>");
    // text = text.replace(/by/, "<span class='text-gray-light'>by</span>");
    // text = text.replace(/to/, "<span class='text-gray-light'>to</span>");
    // text = text.replace(/from/, "<span class='text-gray-light'>from</span>");

    return <div className="w-full text-h6" dangerouslySetInnerHTML={{ __html: text }} />;
  }
});
ActivityItemDescription.displayName = "ActivityItemDescription";

export default ActivityItemDescription;
