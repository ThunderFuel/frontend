import React from "react";
import Button from "components/Button";
import { IconOffer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { setRightMenu } from "store/NFTDetailsSlice";

const MakeOffer = () => {
  const dispatch = useAppDispatch();
  const { isOwner } = useAppSelector((state) => state.nftdetails);

  return isOwner ? (
    <></>
  ) : (
    <div className="flex flex-col p-5 rounded-md border border-gray bg-bg-light ">
      <Button
        className="btn-secondary no-bg"
        onClick={() => {
          dispatch(setRightMenu("makeoffer"));
        }}
      >
        MAKE OFFER <IconOffer />
      </Button>
    </div>
  );
};

export default MakeOffer;
