import React from "react";
import { IconCirclePlus } from "icons";
import Avatar from "components/Avatar";
import SocialButtons from "./SocialButtons";
import { addressFormat } from "utils";

const LogoContainer = ({ userName, image, socialMedias, userId, contractAddress }: any) => {
  return (
    <div className="flex gap-5 w-full">
      <Avatar image={image} userId={userId} className="w-[84px] h-[84px]" />
      <div className="flex flex-col gap-2.5 flex-1 text-gray-light">
        <div className="flex items-center gap-2">
          <h3 className="text-h3 text-white">{userName}</h3>
          <div className="flex items-center gap-2">
            <IconCirclePlus className="" />
            <div className="text-headline-01">FOLLOWS YOU</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="border border-gray rounded-[4px] px-2 py-1.5">
            <span className="body-medium">{addressFormat(contractAddress ?? "")}</span>
          </div>
          <SocialButtons socialMedias={socialMedias} />
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;
