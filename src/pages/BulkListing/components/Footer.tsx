import React from "react";
import EthereumPrice from "components/EthereumPrice";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconInfo, IconTag } from "icons";
import dayjs from "dayjs";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import SelectExpiredDate from "./SelectExpiredDate";
import { useAppDispatch } from "store";
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
    return bulkItems.reduce((total: any, item: any) => total + prices[item.uid] * (1 - (item.royalty + 2.5) / 100), 0);
  }, [bulkItems]);

  return (
    <footer className="sticky bottom-14 lg:bottom-0 border-t border-gray flex flex-col bg-bg">
      <div className="p-4 lg:p-5">
        <div className="flex justify-between text-gray-light items-center">
          <div className="flex flex-col gap-2  w-full lg:w-1/2">
            <div className="flex items-center justify-between">
              <h6 className="text-h6">Service Fee</h6>
              <h6 className="text-h6 text-white mr-2.5">2.5%</h6>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="text-h6">You’ll Receive</h6>
              <EthereumPrice price={getProceedPrice} className="text-green" priceClassName="text-h6" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:flex gap-3 lg:gap-4 justify-end">
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
      </div>
    </footer>
  );
};

export default Footer;
