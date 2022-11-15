import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button {...props} type={type} className={clsx("btn", props.className)}>
      {children}
    </button>
  );
};

export default Button;
