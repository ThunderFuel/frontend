import React, { useState } from "react";
import { IconFullscreen, IconLike, IconRefresh, IconShare, IconTransfer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const ImageBar = () => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();
  const { isOwner } = useAppSelector((state) => state.nftdetails);
  const icons = [
    {
      icon: IconTransfer,
      onClick: () => {
        dispatch(setCheckout({ type: CheckoutType.Transfer }));
        dispatch(toggleCheckoutModal());
      },
    },
    { icon: IconFullscreen, onClick: () => console.log("IconFullscreen") },
    { icon: IconRefresh, onClick: () => console.log("IconRefresh") },
    { icon: IconShare, onClick: () => console.log("IconShare") },
  ];

  return (
    <div className="flex w-fit flex-col gap-5 ">
      <div className="border border-gray rounded-md p-2 group cursor-pointer" onClick={() => setLiked(!liked)}>
        <IconLike stroke="gray" className={`group-hover:stroke-white ${liked ? "text-white stroke-white" : "text-bg-light"}`} />
      </div>
      <div className="flex flex-col border border-gray rounded-md [&>*:nth-child(2)]:border-y [&>*:nth-child(2)]:border-gray ">
        {icons.map((item, key) => {
          const IconItem = item.icon;
          if (!isOwner && item.icon === IconTransfer) return null;

          return (
            <a className="p-2 group cursor-pointer" key={key} onClick={item.onClick}>
              <IconItem className="group-hover:text-white text-[#838383]" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ImageBar;
