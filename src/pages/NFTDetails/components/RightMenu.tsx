import { IconBack, IconClose } from "icons";
import React from "react";
import InfoBox from "./InfoBox";
import clsx from "clsx";
import { useIsMobile } from "hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const a = document.getElementById("rightMenu");

    if (isMobile) {
      if (a) a.style.top = "0";

      return;
    }
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
    <div
      id="rightMenu"
      className={`fixed lg:static z-50 lg:z-auto top-full lg:top-auto lg:left-auto left-0 bg-bg w-full flex flex-col lg:border-lg border-none border-gray transition-all duration-1000 ease-in-out ${className}`}
      style={{ height: isMobile ? "100%" : "calc(100vh - var(--headerHeight))" }}
    >
      <div className="flex justify-between lg:justify-normal items-center border-b border-gray text-white p-5 text-h4 lg:text-h5 lg:gap-5">
        {!isMobile && <IconBack onClick={onBack} className="cursor-pointer w-8 h-8" />}
        {title}
        {isMobile && (
          <div className="flex-center p-2 bg-gray rounded-full">
            <IconClose onClick={onBack} className="cursor-pointer w-3 h-3" />
          </div>
        )}
      </div>
      {description ? <InfoBox description={description} /> : <></>}
      {/* <div className={clsx("flex flex-1 px-10 flex-col py-5 gap-5", childrenHasOverflow ? "overflow-y-scroll no-scrollbar" : "")}>{children}</div> */}
      <div
        className={clsx(
          "flex flex-1 flex-col",
          title === "Activity" ? "" : "gap-5",
          childrenHasOverflow ? "overflow-y-scroll no-scrollbar" : "",
          !tableMenus.includes(title) ? "p-5 lg:px-10 lg:py-5" : ""
        )}
      >
        {children}
      </div>

      {footer && <div className="sticky z-30 bottom-0 mt-auto w-full border-t border-gray bg-bg">{footer}</div>}
    </div>
  );
};

export default RightMenu;
