import React from "react";
import Button from "components/Button";
import InputEthereum from "components/InputEthereum";

import BulkListTable from "./components/BulkListTable";
import Footer from "./components/Footer";

const BulkListing = () => {
  return (
    <div className="flex flex-col">
      <div className="px-32 border-b border-gray">
        <div className="border-x border-gray py-16 px-10">
          <h2 className="text-h2 text-white">Bulk Listing</h2>
        </div>
      </div>
      <div className="px-32">
        <div className="border-x border-gray h-full">
          <div className="px-5 py-2.5 flex items-center justify-between">
            <h6 className="text-h6 text-gray-light">2 Items</h6>
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <Button className="btn-secondary btn-sm uppercase w-[240px]">set top floor price</Button>
                <Button className="btn-secondary btn-sm uppercase w-[240px]">set top traıt price</Button>
              </div>
              <div className="w-32">
                <InputEthereum />
              </div>
            </div>
          </div>
          <div className="border-t border-gray pb-32">
            <BulkListTable />;
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BulkListing;
