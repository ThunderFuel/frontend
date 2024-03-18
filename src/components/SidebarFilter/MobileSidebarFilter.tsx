import React from "react";
import { IconArrowRight, IconCancel, IconClose } from "icons";
import Button from "../Button";
import clsx from "clsx";

const MobileSidebarFilter = ({ children, isOpen, onClose }: any) => {
  return (
    <div className={clsx(isOpen ? "translate-x-0" : "-translate-x-full", "transition-all duration-300 bg-bg fixed top-0 left-0 z-[100] w-full overflow-hidden overflow-y-scroll h-full")}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex item-center justify-between border-b border-b-gray pb-5">
          <h5 className="text-h5 text-white">Filters</h5>
          <button className="flex justify-center items-center w-8 h-8 bg-gray rounded-full" onClick={onClose}>
            <IconClose className="text-white w-3 h-3" />
          </button>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
      <div className="bg-bg fixed flex gap-4 bottom-0 w-full border-t border-t-gray p-4">
        <Button className="btn-secondary flex-1" onClick={onClose}>
          Cancel <IconCancel />
        </Button>

        <Button className="flex-1">
          Apply
          <IconArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default MobileSidebarFilter;
