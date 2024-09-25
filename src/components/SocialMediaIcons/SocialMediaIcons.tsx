import React from "react";
import { IconDiscord, IconSocial3Dots, IconX, IconGithub } from "icons";
import { DISCORD_URL, GUTHUB_URL, MEDIUM_URL, TWITTER_URL } from "global-constants";

const SocialMediaIcons = () => {
  return (
    <ul className="flex gap-3 text-gray-light items-center">
      <a href={MEDIUM_URL} target="_blank" rel="noreferrer" className="hover:text-white">
        <IconSocial3Dots />
      </a>
      <a href={TWITTER_URL} target="_blank" rel="noreferrer" className="hover:text-white">
        <IconX />
      </a>
      <a href={GUTHUB_URL} target="_blank" rel="noreferrer" className="hover:text-white">
        <IconGithub />
      </a>
      <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-white">
        <IconDiscord />
      </a>
    </ul>
  );
};

export default SocialMediaIcons;
