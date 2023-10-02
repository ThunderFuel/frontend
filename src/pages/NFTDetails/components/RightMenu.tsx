import { IconBack } from "icons";
import React from "react";
import InfoBox from "./InfoBox";
import clsx from "clsx";

const tableMenus = ["Offers", "Activity", "Listings", "Bids"];

const RightMenu = ({
  children,
  title,
  description,
  className,
  footer,
  onBack,
  childrenHasOverflow = true,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  childrenHasOverflow?: boolean;
  footer?: JSX.Element;
  onBack: any;
}) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const x = document.getElementById("rightMenu");
    const y = document.getElementById("rightMenuWrapper");

    if (x && y) {
      x.style.position = "fixed";
      x.style.overflow = "hidden";
      x.style.width = "42%";
      x.style.maxWidth = y.offsetWidth + "px";
    }

    return () => {
      if (x && y) {
        x.style.position = "static";
      }
    };
  }, []);

  return (
    <div id="rightMenu" className={`flex flex-col border-l border-gray transition-all duration-1000 ease-in-out ${className}`} style={{ height: "calc(100vh - var(--headerHeight))" }}>
      <div className="flex border-b border-gray text-white p-5 text-head5 gap-x-5">
        <IconBack onClick={onBack} className="cursor-pointer w-8 h-8" />
        {title}
      </div>
      {description ? <InfoBox description={description} /> : <></>}
      {/* <div className={clsx("flex flex-1 px-10 flex-col py-5 gap-5", childrenHasOverflow ? "overflow-y-scroll no-scrollbar" : "")}>{children}</div> */}
      <div className={clsx("flex flex-1 flex-col ", title === "Activity" ? "" : "gap-5", childrenHasOverflow ? "overflow-y-scroll no-scrollbar" : "", !tableMenus.includes(title) ? "px-10 py-5" : "")}>
        {children}
      </div>

      {footer && <div className="sticky z-10 bottom-0 mt-auto w-full border-t border-gray bg-bg">{footer}</div>}
    </div>
  );
};

export default RightMenu;
