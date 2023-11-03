import React from "react";
import EthereumPrice from "components/EthereumPrice";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconInfo, IconTag } from "icons";
import dayjs from "dayjs";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import SelectExpiredDate from "./SelectExpiredDate";
import { useAppDispatch } from "store";
import { formatPrice } from "utils";
import { CheckoutType, removeBulkItems, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { removeAll } from "store/bulkListingSlice";

const Footer = ({ items, prices }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [expiredDateValue, setExpiredDateValue] = React.useState<any>(null);
  const bulkItems = items.filter((item: any) => item.isChecked && prices?.[item.uid]);
  const hasUpdate = bulkItems.some((item: any) => item.salable);

  const onUpdateBulkListing = async () => {
    const bulkListingRequest: any = [];
    const updateBulkListingRequest: any = [];
    bulkItems.forEach((item: any) => {
      const data = {
        name: item.name,
        tokenId: item.id,
        price: prices?.[item.uid],
        expireTime: expiredDateValue?.value,
        tokenOrder: item.tokenOrder,
        collection: item.contractAddress,
        image: item.image, //needed for checkout modal
      };

      if (item.salable) {
        updateBulkListingRequest.push(data);
      } else {
        bulkListingRequest.push(data);
      }
    });

    dispatch(
      setCheckout({
        type: CheckoutType.BulkListing,
        bulkListItems: bulkListingRequest,
        bulkUpdateItems: updateBulkListingRequest,
        onCheckoutComplete: () => {
          navigate(PATHS.PROFILE);
          dispatch(removeBulkItems());
          dispatch(removeAll());
        },
      })
    );
    dispatch(toggleCheckoutModal());
  };

  const getExpiredDate = React.useMemo(() => {
    return dayjs().add(expiredDateValue?.value, "day").format("MM/DD/YYYY H:mm a");
  }, [expiredDateValue]);

  const getProceedPrice = React.useMemo(() => {
    const totalProceedPrice = bulkItems.reduce((total: any, item: any) => total + prices[item.uid] * (1 - (item.royalty + 2.5) / 100), 0);

    return formatPrice(totalProceedPrice);
  }, [bulkItems]);

  return (
    <footer className="sticky bottom-0 border-y border-gray flex flex-col bg-bg">
      <div className="px-5 py-2 flex flex-col gap-2 w-full text-gray-light">
        <div className="flex items-center justify-between">
          <h6 className="text-h6">Service Fee</h6>
          <h6 className="text-h6 text-white">2.5%</h6>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="text-h6">Creator Earnings</h6>
          <h6 className="text-h6 text-white">10%</h6>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="text-h6">You’ll Receive</h6>
          <EthereumPrice price={getProceedPrice} className="text-green" priceClassName="text-h6" />
        </div>
      </div>
      <div className="border-t border-gray flex justify-between px-5 py-4">
        <div>
          <div className="text-h6 text-white">Set Duration</div>
          <div className="flex items-center body-small text-gray-light">
            <IconInfo />
            Expiration at {getExpiredDate}
          </div>
        </div>
        <div>
          <SelectExpiredDate
            value={expiredDateValue}
            onChange={(value: any) => {
              setExpiredDateValue(value);
            }}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            className="btn-secondary"
            onClick={() => {
              navigate(PATHS.PROFILE);
            }}
          >
            CANCEL
            <IconCircleRemoveWhite />
          </Button>
          <Button onClick={onUpdateBulkListing} disabled={!bulkItems.length}>
            {`List${hasUpdate ? "/Update" : ""}`} {bulkItems.length} {bulkItems.length > 1 ? "ITEMS" : "ITEM"}
            <IconTag />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
