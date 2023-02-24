import React, { useState } from "react";
import clsx from "clsx";

import { IconDiscord, IconInstagram, IconShare, IconSocial3Dots, IconStar, IconTelegram, IconTwitter, IconWeblink, IconYoutube } from "icons";
import { SocialTypes } from "api/collections/collections.type";
import collectionsService from "../../../api/collections/collections.service";
import { useAppSelector } from "../../../store";

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

  const onAddWatchList = async () => {
    if (!user?.id) {
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
const SocialButtons = ({ socialMedias, collection }: { socialMedias: { url: string; type: SocialTypes }[] | null; collection?: any }) => {
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
    <div className="flex gap-5">
      {socialMedias?.length ? (
        <ul className="inline-flex border border-gray rounded-[4px]">
          {socialMedias?.map((media, key) => {
            return <SocialButton href={media.url} target="_blank" key={key} icon={iconList?.[media.type] as React.ReactNode} />;
          })}
        </ul>
      ) : null}
      <ul className="inline-flex border border-gray rounded-[4px]">
        {collection ? <FavoriteButton collection={collection} /> : null}
        <SocialButton href="#" icon={IconShare} className={"border-r-0"} />
      </ul>
    </div>
  );
};

export default SocialButtons;
