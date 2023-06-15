import React from "react";
import { useDropDetailContext } from "../../Detail/DetailContext";
import Creator from "../Creator";
import BadgeStatus from "../BadgeStatus";
import dayjs from "dayjs";
import { DROP_STATUS } from "../../../../api/drop/drop.service";

const Title = () => {
  const { dropDetail } = useDropDetailContext();
  const phase = dropDetail.allowListPhase?.[0] ?? {};
  const now = dayjs().valueOf();
  const status = phase.startDate > now ? DROP_STATUS.MINT_SOON : phase.endDate < now ? DROP_STATUS.MINT_OUT : DROP_STATUS.MINT_LIVE;

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-drop-title text-white">{dropDetail.title}</h1>
      <div className="flex gap-4">
        <BadgeStatus status={status} startDate={phase?.startDate} />
        <Creator creator={dropDetail.creator} />
      </div>
    </div>
  );
};

export default Title;
