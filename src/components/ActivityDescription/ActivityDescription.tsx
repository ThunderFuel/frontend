import React from "react";
import { ActivityFilters } from "api/collections/collections.service";
import { addressFormat, formatPrice } from "utils";
import { useAppSelector } from "store";

interface IActivityItemDescription {
  activityType: number;
  fromUserContractAddress: string;
  createdTimeStamp: number;
  toUserContractAddress: string;
  price?: string;
}

const ActivityItemDescription = React.memo(({ price, activityType, fromUserContractAddress }: IActivityItemDescription) => {
  const { user } = useAppSelector((state) => state.wallet);
  let activeTypeLabel = `${ActivityFilters[activityType]} by`;
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
});
ActivityItemDescription.displayName = "ActivityItemDescription";

export default ActivityItemDescription;
