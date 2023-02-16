import React from "react";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";

import BulkListTable from "./components/BulkListTable";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { getBulkListingTableItems } from "store/bulkListingSlice";
import { useIsMobile } from "hooks/useIsMobile";
import MobileWarning from "components/MobileWarning";

const BulkListing = () => {
  const items = useSelector(getBulkListingTableItems);
  const [prices, setPrices] = React.useReducer((prevState: any, nextState: any) => {
    return { ...prevState, ...nextState };
  }, {});

  const onChangeBulkPrice = (value: any) => {
    items.forEach((item: any) => {
      setPrices({ [item.uid]: value });
    });
  };
  const onUpdatePrice = (uid: string, price: any) => {
    setPrices({ [uid]: price });
  };

  return !useIsMobile() ? (
    <div className="flex flex-col">
      <div className="px-32 border-b border-gray">
        <div className="border-x border-gray py-16 px-10">
          <h2 className="text-h2 text-white">Bulk Listing</h2>
        </div>
      </div>
      <div className="px-32">
        <div className="border-x border-gray h-full">
          <div className="px-5 py-2.5 flex items-center justify-between">
            <h6 className="text-h6 text-gray-light">{items.length} Items</h6>
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <Button className="btn-secondary btn-sm uppercase w-[240px]">set top floor price</Button>
                <Button className="btn-secondary btn-sm uppercase w-[240px]">set top traıt price</Button>
              </div>
              <div className="w-32">
                <InputEthereum onChange={onChangeBulkPrice} />
              </div>
            </div>
          </div>
          <div className="border-t border-gray pb-32">
            <BulkListTable items={items} onUpdatePrice={onUpdatePrice} prices={prices} />;
          </div>
          <Footer items={items} prices={prices} />
        </div>
      </div>
    </div>
  ) : (
    <div className="m-5">
      <MobileWarning />
    </div>
  );
};

export default BulkListing;
