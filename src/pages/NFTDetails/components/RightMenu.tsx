import { IconBack } from "icons";
import React from "react";

const RightMenu = ({ children, title, className }: { children: React.ReactNode; title: string; className?: string }) => {
  return (
    <div className={`flex flex-col border-l border-gray transition-all duration-1000 ease-in-out ${className}`}>
      <div className="flex border-b border-gray text-white p-5 text-head5 gap-x-5">
        <IconBack width="32px" height="32px" />
        {title}
      </div>
      <div className="flex flex-col px-10 pt-5 gap-y-[10px] overflow-hidden">{children}</div>
    </div>
  );
};

export default RightMenu;
