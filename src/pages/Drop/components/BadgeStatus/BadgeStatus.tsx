import clsx from "clsx";
import { DROP_STATUS } from "api/drop/drop.service";
import { dateFormat } from "utils";
import React from "react";

const StatusLabel = ({ className, children }: any) => {
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: "currentcolor" }} />
      {children}
    </span>
  );
};
const BadgeStatus = ({ status, startDate }: any) => {
  const text =
    {
      [DROP_STATUS.MINT_LIVE]: <StatusLabel className="text-green">Minting Live</StatusLabel>,
      [DROP_STATUS.MINT_SOON]: <StatusLabel className="text-white">{dateFormat(startDate * 1000, "DD MMM YYYY hh:ss A")}</StatusLabel>,
      [DROP_STATUS.MINT_OUT]: <StatusLabel className="text-white text-opacity-50">Minting Out</StatusLabel>,
    }[status as DROP_STATUS] ?? "-";

  return <div className="drop-item-badge flex-center">{text}</div>;
};

export default BadgeStatus;
