import React from "react";

import "./Item.css";
import Process from "../components/Process/Process";
import { DROP_STATUS } from "api/drop/drop.service";
import SocialButtons from "../components/SocialButtons";
import clsx from "clsx";
import { dateFormat } from "utils";
import { Link } from "react-router-dom";
import { getAbsolutePath } from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import Creator from "../components/Creator";

const ItemStatusLabel = ({ className, children }: any) => {
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: "currentcolor" }} />
      {children}
    </span>
  );
};
const ItemStatus = ({ status, startDate }: any) => {
  const text =
    {
      [DROP_STATUS.MINT_LIVE]: <ItemStatusLabel className="text-green">Mint Live</ItemStatusLabel>,
      [DROP_STATUS.MINT_SOON]: <ItemStatusLabel className="text-white">{dateFormat(startDate, "DD MMM YYYY hh:ss A")}</ItemStatusLabel>,
      [DROP_STATUS.MINT_OUT]: <ItemStatusLabel className="text-white text-opacity-50">Minting Out</ItemStatusLabel>,
    }[status as DROP_STATUS] ?? "-";

  return <div className="drop-item-badge flex-center">{text}</div>;
};

const DropItem = ({ item }: any) => {
  return (
    <Link to={getAbsolutePath(PATHS.DROP_DETAIL, { dropId: item.id })}>
      <div className={clsx("drop-item-container group", item.className)}>
        <div className="drop-item-container-bg" style={{ backgroundImage: `url(${item.banner})` }} />
        <div className="flex flex-1 flex-col justify-between relative z-10">
          <div className="flex justify-end">
            <SocialButtons socialMedias={item.socials} disableShare={true} />
          </div>
          <div className="relative z-10 flex flex-col gap-5">
            <h2 className="text-h2">{item.name}</h2>
            <div className="flex gap-2.5">
              <ItemStatus status={item.status} startDate={item.startDate} />
              <Creator creator={item.creator} />
            </div>
            <Process available={item.available || 0} taken={item.taken || 0} />
            <div className="body-medium max-h-0 transition-all group-hover:max-h-20 text-overflow-3">
              Shellz Orb is a brand set in a post-apocalyptic world. We are born through NFTs to expand into all facets of Web3 and media.
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DropItem;
