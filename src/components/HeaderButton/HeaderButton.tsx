import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
const HeaderButton = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button {...props} type={type} className={clsx("header-btn", props.className)}>
      {children}
    </button>
  );
};

export default HeaderButton;
