import React from "react";
import { ActivityFilters } from "api/collections/collections.service";
import { addressFormat, formatPrice, timeagoFormat } from "utils";
import { useAppSelector } from "store";

interface IActivityItemDescription {
  activityType: number;
  fromUserContractAddress: string;
  createdTimeStamp: number;
  toUserContractAddress: string;
  price?: string;
}

const ActivityItemDescription = React.memo(({ price, activityType, fromUserContractAddress, toUserContractAddress, createdTimeStamp }: IActivityItemDescription) => {
  const { user } = useAppSelector((state) => state.wallet);
  let activeTypeLabel = `${ActivityFilters[activityType]} by`;
  if (price) {
    if (ActivityFilters.Bids === activityType) {
      activeTypeLabel = `${formatPrice(price)} ETH bid placed by`;
    }
    if (ActivityFilters.Listings === activityType) {
      activeTypeLabel = `${formatPrice(price)} ETH list by`;
    }
    if (ActivityFilters.Offers === activityType) {
      activeTypeLabel = `${formatPrice(price)} ETH offer made by`;
    }
    if (ActivityFilters.Sales === activityType) {
      activeTypeLabel = `${formatPrice(price)} ETH sale by`;
    }
    if (ActivityFilters.Transfers === activityType) {
      activeTypeLabel = `Transferred by`;
    }
    if (ActivityFilters.Mints === activityType) {
      activeTypeLabel = `Minted by`;
    }
    const fromUserContractAddressLabel = user.walletAddress === fromUserContractAddress ? "you" : addressFormat(fromUserContractAddress);

    let text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel}</span>`;

    text = text.replace(/you/, "<span class='text-green'>you</span>");

    return <div className="w-full text-head6" dangerouslySetInnerHTML={{ __html: text }} />;
  } else {
    if (ActivityFilters.Bids === activityType) {
      activeTypeLabel = `Bid placed by`;
    }
    if (ActivityFilters.Listings === activityType) {
      activeTypeLabel = `Listed by`;
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

    const fromUserContractAddressLabel = addressFormat(fromUserContractAddress);
    const toUserContractAddressLabel = user.walletAddress === toUserContractAddress ? "you" : addressFormat(toUserContractAddress);

    let text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel} to ${toUserContractAddressLabel}</span>, ${timeagoFormat(createdTimeStamp)}`;
    if ([ActivityFilters.Listings, ActivityFilters.Bids, ActivityFilters.Offers].includes(activityType)) {
      text = `<span>${activeTypeLabel} ${fromUserContractAddressLabel}</span>, ${timeagoFormat(createdTimeStamp)}`;
    }

    text = text.replace(",", "<span class='text-gray-light'>,</span>");
    text = text.replace(/you/, "<span class='text-green'>you</span>");
    text = text.replace(/by/, "<span class='text-gray-light'>by</span>");
    text = text.replace(/to/, "<span class='text-gray-light'>to</span>");
    text = text.replace(/from/, "<span class='text-gray-light'>from</span>");

    return <div className="w-full body-medium" dangerouslySetInnerHTML={{ __html: text }} />;
  }
});
ActivityItemDescription.displayName = "ActivityItemDescription";

export default ActivityItemDescription;
