import React from "react";
import { IconHand, IconLink } from "icons";
import Img from "components/Img";
import EthereumPrice from "components/EthereumPrice";
import ActivityItemDescription from "components/ActivityDescription";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

const ActivityItem = ({ item }: { item: any }) => {
  const Icon = item.typeIcon ?? IconHand;
  const path = getAbsolutePath(PATHS.NFT_DETAILS, { nftId: item?.tokenId });

  return (
    <div className="bg-bg hover:bg-bg-light border border-gray rounded-md flex p-5 text-white gap-5 cursor-pointer">
      <div className="flex items-center gap-2.5 w-32">
        <div className="flex-center h-8 w-8 rounded-full bg-gray">
          <Icon />
        </div>
        <h6 className="text-h6 text-overflow">{item.type}</h6>
      </div>
      <div className="flex items-center flex-1 gap-4">
        <Link to={path} className="w-16 h-16 rounded-md overflow-hidden relative group">
          <Img className="w-full" src={item.image} alt={item.name} />
          <div className="opacity-0 ease-in-out transform duration-300 group-hover:opacity-100 absolute bg-gray bg-opacity-80 top-0 left-0 w-full h-full flex-center">
            <IconLink className="fill-white" />
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-2.5">
          <h5 className="text-h6">{item.name}</h5>
          <ActivityItemDescription
            activityType={item.activityType}
            fromUserContractAddress={item.fromUser?.walletAddress ?? "-"}
            toUserContractAddress={item.toUser?.walletAddress ?? "-"}
            createdTimeStamp={item.createdTimeStamp}
          />
        </div>
      </div>
      {item.price && <EthereumPrice price={item.price} />}
    </div>
  );
};

export default ActivityItem;
