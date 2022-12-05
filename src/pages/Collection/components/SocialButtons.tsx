import React from "react";
import { IconDiscord, IconShare, IconSocial3Dots, IconTelegram, IconTwitter, IconWeblink } from "icons";

const SocialButtons = () => {
  const icons = [IconTwitter, IconDiscord, IconSocial3Dots, IconTelegram, IconWeblink];

  return (
    <div className="flex gap-5">
      <ul className="inline-flex border border-gray rounded-sm">
        {icons.map((icon, key) => {
          const IconItem = icon;

          return (
            <li
              className="p-2 border-l border-l-gray first:border-none text-gray-light hover:text-white cursor-pointer"
              key={key}
            >
              <IconItem className="" />
            </li>
          );
        })}
      </ul>
      <ul className="border border-gray rounded-sm">
        <li className="p-2 first:border-none text-gray-light hover:text-white cursor-pointer">
          <IconShare />
        </li>
      </ul>
    </div>
  );
};

export default SocialButtons;
