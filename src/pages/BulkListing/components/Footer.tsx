import React from "react";
import EthereumPrice from "components/EthereumPrice";
import Button from "components/Button";
import { IconCircleRemoveWhite, IconTag } from "icons";
import dayjs from "dayjs";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { useAppDispatch } from "store";
import { CheckoutType, removeBulkItems, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import { removeAll } from "store/bulkListingSlice";

const Footer = ({ items, prices, onClose }: any) => {
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
          dispatch(removeBulkItems());
          dispatch(removeAll());
          navigate(PATHS.PROFILE);
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
    <div className="flex flex-col">
      <div className="flex justify-between text-gray-light px-5 pb-5">
        <div className="flex flex-col">
          <h6 className="body-medium">Service Fee</h6>
          <h6 className="body-medium">You’ll Receive</h6>
        </div>
        <div className="flex flex-col items-end">
          <h6 className="body-medium text-white">2.5%</h6>
          <EthereumPrice price={getProceedPrice} className="text-green" priceClassName="text-h6" />
        </div>
      </div>
      <div className="grid grid-cols-2 p-5 gap-2.5 border-t border-gray">
        <Button className="btn-secondary w-full" onClick={onClose}>
          CANCEL
        </Button>
        <Button className="w-full" onClick={onUpdateBulkListing} disabled={!bulkItems.length}>
          CONFIRM LISTING
          <IconTag />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
