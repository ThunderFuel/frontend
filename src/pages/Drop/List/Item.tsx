import React from "react";

import "./Item.css";
import Process from "../components/Process/Process";
import SocialButtons from "../components/SocialButtons";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import Creator from "../components/Creator";
import BadgeStatus from "../components/BadgeStatus";

const DropItem = ({ item }: any) => {
  return (
    <Link to={getAbsolutePath(PATHS.DROP_DETAIL, { dropId: item.id })}>
      <div className={clsx("drop-item-container group", item.className)}>
        <div className="drop-item-container-bg" style={{ backgroundImage: `url(${item.bannerImage})` }} />
        <div className="flex flex-1 flex-col justify-between relative z-10">
          <div className="flex justify-end">
            <SocialButtons socialMedias={item.socials} disableShare={true} />
          </div>
          <div className="relative z-10 flex flex-col gap-5">
            <h2 className="text-h2">{item.name}</h2>
            <div className="flex gap-2.5">
              <BadgeStatus status={item.status} startDate={item.startDate} />
              <Creator creator={item.creator} />
            </div>
            <Process available={item.available || 0} taken={item.taken || 0} />
            <div className="body-medium max-h-0 transition-all group-hover:max-h-20 text-overflow-3">
              As a token of our gratitude, we introduce the Open Beta Tester ID NFT Collection reflecting the spirit of our marketplace: innovation, creativity and community.
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DropItem;
