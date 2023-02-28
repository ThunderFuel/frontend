import React from "react";
import clsx from "clsx";
import { useActivityContext } from "../ActivityContext";

const Sidebar = ({ className }: { className?: string }) => {
  const { filters, onChangeSelectedFilter, selectedFilter } = useActivityContext();

  return (
    <div className="flex justify-end">
      <div className={clsx("border-r border-r-gray transition-all duration-300", className ? className : "w-72")}>
        <div className="sticky overflow-hidden" style={{ top: "var(--headerHeight)" }}>
          <div className={clsx("pr-5 py-5 relative", className ? className : "w-72")}>
            <div className="flex items-center justify-between border-b border-b-gray pb-5">
              <h5 className="text-h5 text-white">Event Types</h5>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {Object.keys(filters).map((filterIndex: any) => {
                const filter = filters[filterIndex];
                const Icon = filter.icon;
                const isActive = filterIndex === selectedFilter;

                return (
                  <div
                    key={filterIndex}
                    className={clsx(
                      "inline-flex rounded-md gap-1 border border-gray p-2.5 text-gray-light items-center body-medium cursor-pointer hover:text-white",
                      isActive ? "text-white bg-gray" : "bg-bg"
                    )}
                    onClick={() => {
                      if (selectedFilter === filterIndex) {
                        onChangeSelectedFilter(null);
                      } else {
                        onChangeSelectedFilter(filterIndex);
                      }
                    }}
                  >
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

export default Sidebar;
