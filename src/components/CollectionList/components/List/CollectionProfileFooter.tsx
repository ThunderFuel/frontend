import React from "react";
import Button from "components/Button";
import { IconTag, IconTrash } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { removeAll } from "store/bulkListingSlice";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";

const CollectionFooter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bulkListingItems = useAppSelector((state) => state.bulkListing.items);
  const selectedBulkListingItemCount = bulkListingItems.length;

  if (selectedBulkListingItemCount <= 0) {
    return null;
  }

  const onClear = () => {
    dispatch(removeAll());
  };
  const onUpdateBulkListing = () => {
    if (selectedBulkListingItemCount <= 1) {
      const { id, salable } = bulkListingItems[0];
      const rightMenuType = salable ? RightMenuType.UpdateListing : RightMenuType.ListNFT;

      dispatch(setRightMenu(rightMenuType));
      navigate(PATHS.NFT_DETAILS, { nftId: id });
    } else {
      navigate(PATHS.BULK_LISTING);
    }
  };

  return (
    <div className="sticky py-3 flex gap-3 items-center justify-end border-t border-t-gray bg-bg z-20" style={{ bottom: "calc(var(--footerHeight))" }}>
      <Button className="btn-secondary uppercase" onClick={onClear}>
        Clear {selectedBulkListingItemCount} {selectedBulkListingItemCount > 1 ? "items" : "item"}
        <IconTrash />
      </Button>
      <Button className="uppercase" onClick={onUpdateBulkListing}>
        LIST/ UPDATE {selectedBulkListingItemCount} {selectedBulkListingItemCount > 1 ? "items" : "item"}
        <IconTag />
      </Button>
    </div>
  );
};

export default CollectionFooter;
