import React from "react";
import { FUEL_FAUCET_URL } from "../../global-constants";
import { IconFaucet } from "../../icons";
import clsx from "clsx";
import { useFuelExtension } from "hooks/useFuelExtension";

const GetTestEth = ({ className, user, address }: { className?: string; user: any | undefined; address: string | undefined }) => {
  const { gateway } = useFuelExtension();
  const disabled = gateway === "wagmi";
  const href = `${FUEL_FAUCET_URL}/?address=${user?.walletAddress ?? user?.contractAddress ?? address}&redirectUrl=https%3A%2F%2Fthundernft.market%2F`;

  return (
    <a
      target="_blank"
      aria-disabled={disabled}
      rel="noreferrer"
      href={disabled ? undefined : href}
      className={clsx("btn btn-primary w-full [&[aria-disabled=true]]:opacity-50 [&[aria-disabled=true]]:cursor-not-allowed", className)}
    >
      <span className="text-nowrap">GET TEST ETH</span>
      <IconFaucet />
    </a>
  );
};

export default GetTestEth;
