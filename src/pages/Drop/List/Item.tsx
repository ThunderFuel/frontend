import React from "react";

import "./Item.css";
import Process from "../components/Process/Process";
import { DROP_STATUS } from "api/drop/drop.service";
import Img from "components/Img";
import SocialButtons from "../../Collection/components/SocialButtons";

const ItemStatus = ({ status }: any) => {
  const text = {
    [DROP_STATUS.MINT_NOW]: "Minting Now",
    [DROP_STATUS.MIN_SOON]: "Minting Soon",
    [DROP_STATUS.MIN_OUT]: "Minting Out",
  }[status as DROP_STATUS];

  return <div className="drop-item-badge flex-center text-green">{text ?? "-"}</div>;
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
  console.log(item);

  return (
    <div className="drop-item-container" style={{ background: item.color }}>
      <div className="drop-item-container-bg" style={{ backgroundImage: `url(${item.image})` }} />
      <div className="flex flex-1 flex-col justify-between relative z-10">
        <div className="flex justify-end">
          <SocialButtons className="drop-item-share" socialMedias={item.socials} disableShare={true} />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <h2 className="text-h2">{item.name}</h2>
          <div className="flex gap-2.5">
            <ItemStatus status={item.status} />
            <ItemCreator creator={item.creator} />
          </div>
          <Process available={item.available} taken={item.taken} />
        </div>
      </div>
    </div>
  );
};

export default DropItem;
