import React from "react";
import { IconDiscord, IconShare, IconSocial3Dots, IconTelegram, IconTwitter, IconWeblink } from "icons";
import Tab from "../../../components/Tab";

const SocialButtons = () => {
  const icons = [IconTwitter, IconDiscord, IconSocial3Dots, IconTelegram, IconWeblink];

  return (
    <div className="flex gap-5 mt-1">
      <Tab initTab={null} className="icon link">
        {icons.map((icon, key) => {
          const IconItem = icon;

          return (
            <Tab.Item id={key} key={key}>
              <IconItem />
            </Tab.Item>
          );
        })}
      </Tab>
      <ul className="border border-gray rounded-sm">
        <li className="p-2 first:border-none text-gray-light hover:text-white cursor-pointer">
          <IconShare />
        </li>
      </ul>
    </div>
  );
};

export default SocialButtons;
