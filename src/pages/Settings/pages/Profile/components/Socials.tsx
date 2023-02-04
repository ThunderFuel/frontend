import React from "react";
import Label from "./Label";
import HelperText from "./HelperText";
import clsx from "clsx";
import { IconDiscord, IconSocial3Dots, IconTwitter } from "../../../../../icons";

const InputLabel = ({ className, containerClassName, icon, children, ...etc }: any) => {
  return (
    <div className={clsx("input-container flex flex-row items-center gap-2 px-4", "w-full lg:border lg:h-12 lg:rounded lg:border-gray", containerClassName)}>
      <label className={clsx("input flex items-center", "peer", className)} {...etc}>
        {children}
      </label>
      {icon}
    </div>
  );
};
const Socials = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Social</Label>
      <HelperText>Connect your social account to help collectors verfiying you.</HelperText>
      <div className="flex flex-col gap-2">
        <InputLabel className="text-decoration-underline" icon={<IconTwitter className="text-gray-light" />}>
          Connect Twitter
        </InputLabel>
        <InputLabel className="text-decoration-underline" containerClassName="bg-bg-light" icon={<IconDiscord className="text-white" />}>
          @xero#8190
        </InputLabel>
        <InputLabel className="text-decoration-underline" icon={<IconSocial3Dots className="text-gray-light" />}>
          Connect Medium
        </InputLabel>
      </div>
    </div>
  );
};

export default Socials;
