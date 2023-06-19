import React, { SVGProps } from "react";
import clsx from "clsx";
import { IconHand, IconQuarry } from "icons";
import collectionService, { ActivityFilters } from "api/collections/collections.service";
import { useAppSelector } from "store";
import { addressFormat } from "utils";
import ActivityItemDescription from "../../../../../components/ActivityDescription";

interface IBox {
  header: string;
  onClick?: () => void;
  className?: string;
  children: any;
}

const Box = React.memo(({ header, onClick, className, children }: IBox) => {
  return (
    <div className={clsx("flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md cursor-pointer", className)} onClick={onClick}>
      <div className="text-headline-01 uppercase">{header}</div>
      <h4 className="text-h4 text-white">{children}</h4>
    </div>
  );
});
Box.displayName = "Box";

const BoxWithIcon = React.memo(({ children, className, icon }: { children: React.ReactNode; className?: string; icon: React.FC<SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;

  return (
    <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>
      <div className="h-fit rounded-full bg-gray p-[6px]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-y-[5px]">{children}</div>
    </div>
  );
});
BoxWithIcon.displayName = "BoxWithIcon";

const BoxWithIconLastActivity = React.memo(({ lastActivity }: any) => {
  const filters = collectionService.getActivityFilters();
  const typeIcon = filters[lastActivity?.activityType as ActivityFilters]?.icon;

  return (
    <BoxWithIcon icon={typeIcon ?? IconQuarry} className="mt-2">
      <div className="text-headline-01 text-gray-light uppercase">LAST ACTIVITY</div>
      <h6 className="text-h6">
        <ActivityItemDescription
          price={lastActivity.price}
          activityType={lastActivity.activityType}
          fromUserContractAddress={lastActivity.fromUser?.walletAddress}
          createdTimeStamp={lastActivity.createdTimeStamp}
          toUserContractAddress={lastActivity.toUser?.walletAddress}
          noTime={true}
        />
      </h6>
    </BoxWithIcon>
  );
});
BoxWithIconLastActivity.displayName = "BoxWithIconLastActivity";

const BoxWithIconLastOffer = React.memo(({ lastOffer }: any) => {
  const { user } = useAppSelector((state) => state.wallet);

  return (
    <BoxWithIcon icon={IconHand} className="mt-2">
      <div className="text-headline-01 text-gray-light uppercase">LAST offer</div>
      <h6 className="text-h6">
        {lastOffer?.price} ETH Bid placed by {lastOffer?.makerUserId === user?.id ? <span className="text-green">you</span> : addressFormat(lastOffer?.makerAddress)}
      </h6>
    </BoxWithIcon>
  );
});
BoxWithIconLastOffer.displayName = "BoxWithIconLastOffer";

export { Box, BoxWithIcon, BoxWithIconLastActivity, BoxWithIconLastOffer };
