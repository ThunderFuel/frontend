import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { IconWallet } from "icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const ButtonWallet = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button {...props} type={type} className={clsx("btn-wallet", props.className)}>
      <IconWallet />
      {children}
    </button>
  );
};

export default ButtonWallet;
