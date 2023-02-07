import React from "react";
import { IconCirclePlus } from "icons";
import Avatar from "components/Avatar";
import SocialButtons from "./SocialButtons";

const LogoContainer = ({ userName, image, socialMedias, userId }: any) => {
  return (
    <div className="flex gap-5 w-full">
      <Avatar image={image} userId={userId} className="w-[95px] h-[95px]" />
      <div className="flex flex-col gap-2.5 flex-1">
        <h3 className="text-h3">{userName}</h3>
        <SocialButtons socialMedias={socialMedias} />
        <div className="flex items-center gap-2">
          <IconCirclePlus className="text-gray-light" />
          <div className="text-headline-01 text-gray-light">FOLLOWS YOU</div>
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;
