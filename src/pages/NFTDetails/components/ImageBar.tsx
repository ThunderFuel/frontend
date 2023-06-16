import React, { useEffect, useState } from "react";
import { IconFullscreen, IconLike, IconRefresh, IconShare, IconTransfer } from "icons";
import { useAppDispatch, useAppSelector } from "store";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import nftdetailsService from "api/nftdetails/nftdetails.service";
import userService from "api/user/user.service";
import { toggleWalletModal } from "store/walletSlice";
import { useShareTwitter } from "hooks/useShareTwitter";

const ImageBar = ({ nft, toggleFullscreen }: any) => {
  const dispatch = useAppDispatch();
  const shareTwitter = useShareTwitter();
  const [isLiked, setIsliked] = useState(false);
  const { user, isConnected } = useAppSelector((state) => state.wallet);

  const isOwner = () => {
    return user?.id === nft?.user?.id;
  };

  const handleLike = () => {
    if (isConnected)
      nftdetailsService
        .tokenLike({
          tokenId: nft.id,
          userId: user.id,
          like: !isLiked,
        })
        .then((res) => res.data === true && setIsliked(!isLiked));
    else dispatch(toggleWalletModal());
  };

  const fetchIsLiked = async () => {
    if (nft.id !== undefined && user.id !== undefined) {
      const response = await userService.isLiked({ tokenId: nft.id, userId: user.id });
      setIsliked(response.data);
    }
  };

  useEffect(() => {
    fetchIsLiked();
  }, [user]);

  const onShare = () => {
    shareTwitter.shareNft(nft.name, nft.collection.name);
  };
  const icons = [
    {
      icon: IconTransfer,
      onClick: () => {
        dispatch(setCheckout({ type: CheckoutType.Transfer }));
        dispatch(toggleCheckoutModal());
      },
    },
    { icon: IconFullscreen, onClick: () => toggleFullscreen() },
    { icon: IconRefresh, onClick: () => console.log("IconRefresh") },
    {
      icon: IconShare,
      onClick: onShare,
    },
  ];

  return (
    <div className="flex absolute right-[38px] w-fit flex-col gap-5">
      <div className="border border-gray rounded-md p-2 group cursor-pointer bg-bg-light" onClick={() => handleLike()}>
        <IconLike stroke="gray" className={`group-hover:stroke-white ${isLiked ? "text-white stroke-white" : "text-bg-light"}`} />
      </div>
      <div className="flex flex-col border border-gray rounded-md [&>*:nth-child(2)]:border-y [&>*:nth-child(2)]:border-gray bg-bg-light">
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
