import React from "react";
import { IconArrowDown, IconArrowUp } from "icons";
import clsx from "clsx";

const CollapseContext = React.createContext({} as any);
const useCollapseContext = () => React.useContext(CollapseContext);

const Header = ({ children }: { children: any }) => {
  const { onSetShow, show, showIcon, headerBorder } = useCollapseContext();

  return (
    <div className={clsx("p-3 text-h6 text-white flex justify-between items-center cursor-pointer", headerBorder && show ? "border-b border-gray" : "")} onClick={onSetShow}>
      {children}
      {showIcon ? show ? <IconArrowUp /> : <IconArrowDown /> : null}
    </div>
  );
};
const Body = ({ children, containerClassName }: { children: any; containerClassName?: string }) => {
  const { show } = useCollapseContext();
  if (!show) {
    return null;
  }

  return <div className={clsx("flex flex-col gap-2 p-4 pt-1", containerClassName)}>{children}</div>;
};
const Collapse = ({
  children,
  isOpen = false,
  className,
  onOpenCallBack,
  showIcon = true,
  headerBorder = false,
}: {
  children: any;
  isOpen?: boolean;
  className?: string;
  onOpenCallBack?: (show: any) => void;
  showIcon?: boolean;
  headerBorder?: boolean;
}) => {
  const [show, setShow] = React.useState<boolean>(isOpen);
  const onSetShow = () => {
    setShow(!show);
    if (onOpenCallBack) {
      onOpenCallBack(!show);
    }
  };

  return (
    <div className={clsx("border border-gray rounded-md", className)}>
      <CollapseContext.Provider
        value={{
          show,
          onSetShow,
          showIcon,
          headerBorder,
        }}
      >
        {children}
      </CollapseContext.Provider>
    </div>
  );
};

export default Object.assign(Collapse, { Header, Body });
