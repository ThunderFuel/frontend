import React from "react";
import clsx from "clsx";

import { IconDiscord, IconShare, IconSocial3Dots, IconTelegram, IconTwitter, IconWeblink } from "icons";

const SocialButton = ({ icon, className, ...etc }: { icon: any; className?: string; [key: string]: any }) => {
  const IconItem = icon;

  return (
    <li className={clsx("border-r border-r-gray last:border-r-0 text-gray-light", className)}>
      <a {...etc} className="block p-2 no-underline hover:text-white">
        <IconItem />
      </a>
    </li>
  );
};
const SocialButtons = () => {
  const icons = [IconTwitter, IconDiscord, IconSocial3Dots, IconTelegram, IconWeblink];

  return (
    <div className="flex gap-5 mt-1">
      <ul className="inline-flex border border-gray rounded-[4px]">
        {icons.map((icon, key) => {
          return <SocialButton href="#" key={key} icon={icon} />;
        })}
      </ul>
      <ul className="border border-gray rounded-[4px]">
        <SocialButton href="#" icon={IconShare} className={"border-r-0"} />
      </ul>
    </div>
  );
};

export default SocialButtons;
