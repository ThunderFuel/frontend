import React from "react";
import Button from "components/Button";
import { IconOffer } from "icons";
import { useAppSelector } from "store";

const MakeOffer = () => {
  const { isOwner } = useAppSelector((state) => state.nftdetails);

  return isOwner ? (
    <></>
  ) : (
    <div className="flex flex-col p-5 rounded-md border border-gray bg-bg-light ">
      <Button className="btn-secondary no-bg">
        MAKE OFFER <IconOffer />
      </Button>
    </div>
  );
};

export default MakeOffer;
