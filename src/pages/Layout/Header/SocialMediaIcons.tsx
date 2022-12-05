import React from "react";
import { IconDiscord, IconSocial3Dots, IconTwitter } from "../../../icons";

const SocialMediaIcons = () => {
  return (
    <ul className="flex gap-3 text-gray-light">
      <a href="https://discord.gg/WeN88sXCnS">
        <IconDiscord />
      </a>
      <a href="twitter.com/ThunderbyFuel">
        <IconTwitter />
      </a>
      <a href="https://medium.com/@ThunderbyFuel/">
        <IconSocial3Dots />
      </a>
    </ul>
  );
};

export default SocialMediaIcons;
