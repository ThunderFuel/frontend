import React from "react";
import EthereumPrice from "components/EthereumPrice";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconInfo, IconTag } from "icons";
import dayjs from "dayjs";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import collectionsService from "api/collections/collections.service";
import SelectExpiredDate from "./SelectExpiredDate";

const Footer = ({ items, prices }: any) => {
  const navigate = useNavigate();
  const [expiredDate, setExpiredDate] = React.useState<any>(null);
  const bulkItems = items.filter((item: any) => item.isChecked && prices?.[item.uid]);
  const onUpdateBulkListing = async () => {
    try {
      const data = bulkItems.map((item: any) => ({
        tokenId: item.id,
        price: prices?.[item.uid],
        expireTime: Math.round(dayjs().add(expiredDate?.value, "days").valueOf() / 1000),
      }));
      await collectionsService.updateBulkListing(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <footer className="sticky bottom-0 border-y border-gray flex flex-col bg-bg">
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
        <div>
          <SelectExpiredDate
            value={expiredDate}
            onChange={(value: any) => {
              console.log(value);
              setExpiredDate(value);
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="btn-secondary"
            onClick={() => {
              navigate(PATHS.PROFILE);
            }}
          >
            CANCEL
            <IconCircleRemoveWhite />
          </Button>
          <Button onClick={onUpdateBulkListing}>
            LIST {bulkItems.length} {bulkItems.length > 1 ? "ITEMS" : "ITEM"}
            <IconTag />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
