import React from "react";
import Button from "components/Button";
import { IconOffer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";

const MakeOffer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.wallet);
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);

  const isOwner = () => {
    return user?.id === selectedNFT?.user?.id;
  };

  return isOwner() ? (
    <></>
  ) : (
    <div className="flex flex-col p-5 rounded-md border border-gray bg-bg-light ">
      <Button
        className="btn-secondary no-bg"
        onClick={() => {
          dispatch(setRightMenu(RightMenuType.MakeOffer));
        }}
      >
        MAKE OFFER <IconOffer />
      </Button>
    </div>
  );
};

export default MakeOffer;
