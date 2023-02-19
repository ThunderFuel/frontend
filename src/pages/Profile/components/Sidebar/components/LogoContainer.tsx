import React from "react";
import { IconCirclePlus } from "icons";
import Avatar from "components/Avatar";
import SocialButtons from "./SocialButtons";
import { addressFormat } from "utils";
import { useAppSelector } from "store";

const LogoContainer = ({ userInfo }: any) => {
  const { user } = useAppSelector((state) => state.wallet) as any;
  const isFollowers = userInfo?.follows?.find((follower: any) => follower.userId === user?.id);

  const walletAddress = addressFormat(userInfo?.walletAddress);

  return (
    <div className="flex gap-5 w-full">
      <Avatar image={userInfo?.image} userId={user?.id} className="w-[84px] h-[84px]" />
      <div className="flex flex-col gap-2.5 flex-1 text-gray-light">
        <div className="flex items-center gap-2">
          <h3 className="text-h3 text-white">{userInfo?.userName ?? walletAddress}</h3>
          {isFollowers ? (
            <div className="flex items-center gap-2">
              <IconCirclePlus className="" />
              <div className="text-headline-01">FOLLOWS YOU</div>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2">
          <div className="border border-gray rounded-[4px] px-2 py-1.5">
            <span className="body-medium">{walletAddress}</span>
          </div>
          <SocialButtons socialMedias={userInfo?.socialMedias ?? []} />
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;
