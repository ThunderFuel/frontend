import React from "react";
import { IconCircleRemoveWhite } from "icons";
import Button from "components/Button";
import { useOfferContext } from "./OfferContext";
import OfferTable from "components/OfferTable";
import config from "../../../../config";
import Config from "../../../../components/Config";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import MobileSidebarFilter from "./MobileSidebarFilter/MobileSidebarFilter";

const OfferList = ({ headers }: any) => {
  const { onCancelAllOffer, onAcceptOffer, onCancelOffer, onUpdateOffer, filterValue, getOffers, getBidBalance, options } = useOfferContext();
  const isMobile = useIsMobile();
  const isOffersMade = filterValue.offerType === 1;
  const label = `${getOffers.length} ${isOffersMade ? " offers made" : " offers receıved"}`;
  const hasActiveOffer = getOffers.some((offer: any) => offer.isActiveOffer);

  return (
    <div className="w-full flex flex-col lg:flex-1 lg:pt-5 gap-5">
      {isMobile ? <MobileSidebarFilter /> : null}

      <div className="flex items-center justify-between px-5">
        <div className="text-headline-02 text-gray-light uppercase">{label}</div>
        {isOffersMade && hasActiveOffer && options?.isProfile ? (
          <Config show={!config.isHideAllCancelButtons()}>
            <Button className="btn-secondary btn-sm" onClick={onCancelAllOffer}>
              cancel all offers <IconCircleRemoveWhite />
            </Button>
          </Config>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <OfferTable
          isOffersMade={isOffersMade}
          headers={headers}
          items={getOffers}
          onCancelOffer={onCancelOffer}
          onAcceptOffer={onAcceptOffer}
          onUpdateOffer={onUpdateOffer}
          getBidBalance={getBidBalance}
          isProfile={options?.isProfile}
        />
      </div>
    </div>
  );
};

export default OfferList;
