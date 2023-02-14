import React from "react";
import { ActivityFilters } from "api/collections/collections.service";
import { addressFormat, timeagoFormat } from "../../utils";
import { useAppSelector } from "../../store";

interface IActivityItemDescription {
  activityType: number;
  fromUserContractAddress: string;
  createdTimeStamp: number;
  toUserContractAddress: string;
}

const ActivityItemDescription = React.memo(({ activityType, fromUserContractAddress, toUserContractAddress, createdTimeStamp }: IActivityItemDescription) => {
  const { user } = useAppSelector((state) => state.wallet);
  let activeTypeLabel = `${ActivityFilters[activityType]} by`;
  if (ActivityFilters.Bids === activityType) {
    activeTypeLabel = `${ActivityFilters[activityType]} placed by`;
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
});
ActivityItemDescription.displayName = "ActivityItemDescription";

export default ActivityItemDescription;
