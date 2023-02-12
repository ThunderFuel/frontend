import React, { SVGProps } from "react";
import clsx from "clsx";

interface IBox {
  header: string;
  onClick?: () => void;
  className?: string;
  children: any;
}

const Box = React.memo(({ header, onClick, className, children }: IBox) => {
  return (
    <div className={clsx("flex flex-col gap-2 px-4 py-3.5 text-gray-light bg-bg border border-gray rounded-md cursor-pointer", className)} onClick={onClick}>
      <div className="text-headline-01 uppercase">{header}</div>
      <h4 className="text-h4 text-white">{children}</h4>
    </div>
  );
});
Box.displayName = "Box";

const BoxWithIcon = React.memo(({ children, className, icon }: { children: React.ReactNode; className?: string; icon: React.FC<SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;

  return (
    <div className={clsx("group flex items-center w-full py-4 pl-2.5 gap-x-2.5 rounded-[5px] border border-gray", className)}>
      <div className="h-fit rounded-full bg-gray p-[6px]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-y-[5px]">{children}</div>
    </div>
  );
});
BoxWithIcon.displayName = "BoxWithIcon";

export { Box, BoxWithIcon };
