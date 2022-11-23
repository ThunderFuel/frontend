import React from "react";
import { IconDiscord, IconSocial3Dots, IconTwitter } from "../../../icons";

const SocialMediaIcons = () => {
  return (
    <ul className="hidden md:flex gap-3 text-gray-light">
      <li>
        <IconTwitter />
      </li>
      <li>
        <IconDiscord />
      </li>
      <li>
        <IconSocial3Dots />
      </li>
    </ul>
  );
};

export default SocialMediaIcons;
