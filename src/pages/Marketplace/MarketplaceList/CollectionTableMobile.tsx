import React from "react";
import clsx from "clsx";

import { IconEthereum, IconStar } from "icons";

const CollectionTableMobile = ({ items = [], footerSlot }: { items: any[]; footerSlot?: JSX.Element }) => {
  const FooterSlot = footerSlot || null;

  return (
    <div className="collection-table">
      <div className="border-b border-gray pb-10">
        <div className="container">
          <div className="tbody">
            {items.map((item, key) => (
              <div key={key} className={clsx("tr")}>
                <div className="flex justify-between items-center p-[18px] border-b border-gray">
                  <div className="flex items-center gap-5">
                    <img src={item.image} loading="lazy" />
                    <h6 className="text-h6">{item.collection}</h6>
                  </div>
                  <IconStar className="text-gray" />
                </div>
                <div className="flex gap-12 items-center p-[18px]">
                  <div className="flex flex-col ">
                    <h6 className="font-bigShoulderDisplay text-headline-01 text-gray-light">VOLUME (24H)</h6>
                    <div className="flex items-center">
                      <h6 className="text-h5">{item.volume}</h6>
                      <IconEthereum className="text-gray-light" />
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <h6 className="font-bigShoulderDisplay text-headline-01 text-gray-light">FLOOR</h6>
                    <div className="flex items-center">
                      <h6 className="text-h5">{item.floor}</h6>
                      <IconEthereum className="text-gray-light" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {FooterSlot}
        </div>
      </div>
    </div>
  );
};

export default CollectionTableMobile;
