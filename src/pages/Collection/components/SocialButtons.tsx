import React from "react";
import clsx from "clsx";

import { IconDiscord, IconShare, IconSocial3Dots, IconTelegram, IconTwitter, IconWeblink } from "icons";
import { SocialTypes } from "api/collections/collections.type";

const SocialButton = ({ icon, className, ...etc }: { icon: any; className?: string; [key: string]: any }) => {
  const IconItem = icon ?? null;

  return (
    <li className={clsx("border-r border-r-gray last:border-r-0 text-gray-light", className)}>
      <a {...etc} className="block p-2 no-underline hover:text-white">
        <IconItem />
      </a>
    </li>
  );
};
const SocialButtons = ({ socialMedias }: { socialMedias: { url: string; type: SocialTypes }[] | null }) => {
  const iconList: any = {
    [SocialTypes.Website]: IconWeblink,
    [SocialTypes.Discord]: IconDiscord,
    [SocialTypes.Instagram]: IconDiscord,
    [SocialTypes.Youtube]: IconDiscord,
    [SocialTypes.Twitter]: IconTwitter,
    [SocialTypes.Telegram]: IconTelegram,
    [SocialTypes.Medium]: IconSocial3Dots,
  };

  return (
    <div className="flex gap-5 mt-1">
      {socialMedias?.length ? (
        <ul className="inline-flex border border-gray rounded-[4px]">
          {socialMedias?.map((media, key) => {
            return <SocialButton href="#" key={key} icon={iconList?.[media.type] as React.ReactNode} />;
          })}
        </ul>
      ) : null}
      <ul className="border border-gray rounded-[4px]">
        <SocialButton href="#" icon={IconShare} className={"border-r-0"} />
      </ul>
    </div>
  );
};

export default SocialButtons;
