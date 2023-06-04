import React from "react";

import "./Item.css";
import Process from "../components/Process/Process";
import { DROP_STATUS } from "api/drop/drop.service";
import Img from "components/Img";
import SocialButtons from "../components/SocialButtons";
import clsx from "clsx";

const ItemStatusLabel = ({ className, children }: any) => {
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: "currentcolor" }} />
      {children}
    </span>
  );
};
const ItemStatus = ({ status }: any) => {
  const text =
    {
      [DROP_STATUS.MINT_LIVE]: <ItemStatusLabel className="text-green">Mint Live</ItemStatusLabel>,
      [DROP_STATUS.MINT_SOON]: <ItemStatusLabel className="text-white">Minting Soon</ItemStatusLabel>,
      [DROP_STATUS.MINT_OUT]: <ItemStatusLabel className="text-white text-opacity-50">Minting Out</ItemStatusLabel>,
    }[status as DROP_STATUS] ?? "-";

  return <div className="drop-item-badge flex-center">{text}</div>;
};
const ItemCreator = ({ creator }: any) => {
  return (
    <div className="drop-item-badge flex gap-2.5 items-center">
      <Img className="w-8 h-8 overflow-hidden rounded-full" src={creator.image} />
      <div className="text-white">
        <span className="text-white text-opacity-50">Created by </span>
        {creator.name}
      </div>
    </div>
  );
};

const DropItem = ({ item }: any) => {
  return (
    <div className="drop-item-container group" style={{ background: item.color }}>
      <div className="drop-item-container-bg" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="flex flex-1 flex-col justify-between relative z-10">
        <div className="flex justify-end">
          <SocialButtons socialMedias={item.socials} disableShare={true} />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <h2 className="text-h2">{item.name}</h2>
          <div className="flex gap-2.5">
            <ItemStatus status={item.status} />
            <ItemCreator creator={item.creator} />
          </div>
          <Process available={item.available} taken={item.taken} />
          <div className="body-medium max-h-0 transition-all group-hover:max-h-20 text-overflow-3">
            Shellz Orb is a brand set in a post-apocalyptic world. We are born through NFTs to expand into all facets of Web3 and media.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropItem;
