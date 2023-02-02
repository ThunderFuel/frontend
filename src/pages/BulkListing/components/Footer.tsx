import React from "react";
import EthereumPrice from "components/EthereumPrice";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconInfo, IconTag } from "icons";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 border-t border-gray flex flex-col bg-bg">
      <div className="px-5 py-2 flex flex-col gap-2 w-full text-gray-light">
        <div className="flex items-center justify-between">
          <h6 className="text-h6">Service Fee</h6>
          <h6 className="text-h6 text-white">2.5%, 2%</h6>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="text-h6">Creator Earnings</h6>
          <h6 className="text-h6 text-white">10%</h6>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="text-h6">You’ll Recieve</h6>
          <EthereumPrice price={7.99} className="text-green" priceClassName="text-h6" />
        </div>
      </div>
      <div className="border-t border-gray flex justify-between px-5 py-4">
        <div>
          <div className="text-h6 text-white">Set Duration</div>
          <div className="flex items-center body-small text-gray-light">
            <IconInfo />
            Expiration at 12/12/2022, 8:41 PM
          </div>
        </div>
        <div></div>
        <div className="flex justify-end">
          <Button className="btn-secondary">
            CANCEL
            <IconCircleRemoveWhite />
          </Button>
          <Button>
            LIST 1 ITEM
            <IconTag />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
