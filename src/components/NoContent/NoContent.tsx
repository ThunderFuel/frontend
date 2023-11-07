import Button from "components/Button";
import { IconRefresh, IconStop } from "icons";
import React from "react";
import clsx from "clsx";

const NoContent = ({ className }: any) => {
  return (
    <div className={clsx("flex flex-col items-center justify-center h-full w-full gap-4 bg-bg ", className)}>
      <IconStop className="w-10 h-10 text-gray-light" />
      <span className="font-Inter text-white" style={{ fontSize: "12px" }}>
        No content available.
      </span>
      <Button className="btn-sm btn-secondary w-fit">
        Refresh <IconRefresh className="w-[18px] h-[18px]" />
      </Button>
    </div>
  );
};

export default NoContent;
