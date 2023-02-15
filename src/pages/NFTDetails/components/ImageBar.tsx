import React, { useEffect, useState } from "react";
import { IconFullscreen, IconLike, IconRefresh, IconShare, IconTransfer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import userService from "api/user/user.service";
import { toggleWalletModal } from "store/walletSlice";

const ImageBar = () => {
  const dispatch = useAppDispatch();
  const { selectedNFT } = useAppSelector((state) => state.nftdetails);
  const [isLiked, setIsliked] = useState(false);
  const { user, isConnected } = useAppSelector((state) => state.wallet);

  const isOwner = () => {
    return user?.id === selectedNFT?.user?.id;
  };

  const handleLike = () => {
    if (isConnected) nftdetailsService.tokenLike({ tokenId: selectedNFT.id, userId: user.id, like: !isLiked }).then((res) => res.data === true && setIsliked(!isLiked));
    else dispatch(toggleWalletModal());
  };

  const fetchIsLiked = async () => {
    const response = await userService.isLiked({ tokenId: selectedNFT.id, userId: user.id });
    setIsliked(response.data);
  };

  useEffect(() => {
    fetchIsLiked();
  }, [user, isLiked]);

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
    <div className="flex absolute right-[38px] w-fit flex-col gap-5">
      <div className="border border-gray rounded-md p-2 group cursor-pointer" onClick={() => handleLike()}>
        <IconLike stroke="gray" className={`group-hover:stroke-white ${isLiked ? "text-white stroke-white" : "text-bg-light"}`} />
      </div>
      <div className="flex flex-col border border-gray rounded-md [&>*:nth-child(2)]:border-y [&>*:nth-child(2)]:border-gray ">
        {icons.map((item, key) => {
          const IconItem = item.icon;
          if (!isOwner() && item.icon === IconTransfer) return null;

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
