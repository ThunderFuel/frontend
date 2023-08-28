import React, { useState } from "react";
import clsx from "clsx";

import { IconDiscord, IconInstagram, IconLink, IconShare, IconSocial3Dots, IconStar, IconTelegram, IconTwitter, IconWeblink, IconYoutube } from "icons";
import { SocialTypes } from "api/collections/collections.type";
import collectionsService from "api/collections/collections.service";
import { useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { toggleWalletModal } from "store/walletSlice";
import { useClickOutside } from "hooks/useClickOutside";
import { clipboardCopy } from "utils";
import useToast from "hooks/useToast";
import { useShareTwitter } from "hooks/useShareTwitter";

const SocialButton = ({ icon, className, ...etc }: { icon: any; className?: string; [key: string]: any }) => {
  const IconItem = icon ?? null;

  return (
    <li className={clsx("border-r border-r-gray last:border-r-0 text-gray-light flex-center", className)}>
      <a {...etc} className="block px-2 py-2 no-underline hover:text-white">
        <IconItem />
      </a>
    </li>
  );
};
const FavoriteButton = ({ collection }: { collection: any }) => {
  const { user } = useAppSelector((state) => state.wallet);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onAddWatchList = async () => {
    if (!user?.id) {
      dispatch(toggleWalletModal());

      return false;
    }

    const value = !isFavorite;
    try {
      await collectionsService.addWatchList({
        userId: user?.id,
        collectionId: collection.id,
        watch: value,
      });
      setIsFavorite(value);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    setIsFavorite(collection.watched);
  }, [collection.watched]);

  return (
    <li className={clsx("border-r border-r-gray last:border-r-0 text-gray-light flex-center cursor-pointer")} onClick={onAddWatchList}>
      <span className="block px-2.5 py-2.5 no-underline hover:text-white">
        <IconStar className={clsx(isFavorite ? "fill-white text-white" : "text-gray-light hover:fill-gray-light")} />
      </span>
    </li>
  );
};

const SocialShareButton = ({ collection, user, className = "right-0" }: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLLIElement>(null);
  const shareTwitter = useShareTwitter();

  const items = [
    {
      text: "Copy Link",
      icon: IconLink,
      onClick: () => {
        clipboardCopy(window.location.href);
        useToast().success("Copied to clipboard.");
        setShow(false);
      },
    },
    {
      text: "Share on Twitter",
      icon: IconTwitter,
      onClick: () => {
        if (collection) {
          shareTwitter.shareCollection(collection.name);
        } else if (user) {
          shareTwitter.shareProfile(user.userName);
        }
        setShow(false);
      },
    },
  ];
  useClickOutside(containerRef, () => {
    setShow(false);
  });

  return (
    <li className="relative z-10" ref={containerRef}>
      <div className={clsx("px-2 py-2 hover:text-white cursor-pointer", show ? "text-white bg-bg-light" : "text-gray-light")} onClick={() => setShow(!show)}>
        <IconShare />
      </div>
      {show ? (
        <ul className={clsx("absolute top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] divide-y divide-gray overflow-hidden", className)}>
          {items.map((item, k) => {
            const Icon = item.icon;

            return (
              <li key={k} onClick={item.onClick} className="flex w-[200px] items-center justify-between cursor-pointer px-4 py-3 text-white hover:bg-bg-light">
                <span className="flex w-full body-medium whitespace-nowrap">{item.text}</span>
                <Icon />
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};
const SocialButtons = ({
  socialMedias,
  collection,
  user,
  disableShare = false,
  className,
  shareDropdownClassName = "right-0",
}: {
  socialMedias: { url: string; type: SocialTypes }[] | null;
  collection?: any;
  user?: any;
  disableShare?: boolean;
  className?: string;
  shareDropdownClassName?: string;
}) => {
  const iconList: any = {
    [SocialTypes.Website]: IconWeblink,
    [SocialTypes.Discord]: IconDiscord,
    [SocialTypes.Instagram]: IconInstagram,
    [SocialTypes.Youtube]: IconYoutube,
    [SocialTypes.Twitter]: IconTwitter,
    [SocialTypes.Telegram]: IconTelegram,
    [SocialTypes.Medium]: IconSocial3Dots,
  };

  return (
    <div className={clsx("flex gap-5", className)}>
      {socialMedias?.length ? (
        <ul className="inline-flex border border-gray rounded-[4px]">
          {socialMedias?.map((media, key) => {
            return <SocialButton href={media.url} target="_blank" key={key} icon={iconList?.[media.type] as React.ReactNode} />;
          })}
        </ul>
      ) : null}
      {!disableShare ? (
        <ul className="inline-flex border border-gray rounded-[4px]">
          {collection ? <FavoriteButton collection={collection} /> : null}
          <SocialShareButton collection={collection} user={user} className={shareDropdownClassName} />
        </ul>
      ) : null}
    </div>
  );
};

export default SocialButtons;
