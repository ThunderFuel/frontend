import React from "react";
import clsx from "clsx";
import { IconHand, IconMarketBasket, IconQuarry, IconTag, IconTelegram } from "icons";

const staticFilters = [
  {
    icon: IconMarketBasket,
    name: "Sales",
  },
  {
    icon: IconHand,
    name: "Offers",
  },
  {
    icon: IconTag,
    name: "Listings",
  },
  {
    icon: IconQuarry,
    name: "Mints",
  },
  {
    icon: IconTelegram,
    name: "Transfers",
  },
];
const SidebarEvents = () => {
  return (
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", "w-72")}>
        <div className="sticky top-[178px] overflow-hidden">
          <div className="w-72 pr-5 py-5 relative">
            <div className="flex items-center justify-between border-b border-b-gray pb-5">
              <h5 className="text-h5 text-white">Event Types</h5>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {staticFilters.map((filter, i) => {
                const Icon = filter.icon;

                return (
                  <div key={i} className="inline-flex rounded-md gap-1 bg-bg border border-gray p-2.5 text-gray-light items-center body-medium cursor-pointer hover:text-white">
                    <Icon className="w-5 h-5" />
                    {filter.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarEvents;
