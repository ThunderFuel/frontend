import React from "react";
import { IconArrowDown, IconArrowUp } from "icons";
import clsx from "clsx";

const CollapseContext = React.createContext({} as any);
const useCollapseContext = () => React.useContext(CollapseContext);

const Header = ({ children }: { children: any }) => {
  const { onSetShow, show } = useCollapseContext();

  return (
    <div className="p-4 text-h6 text-white flex justify-between items-center cursor-pointer" onClick={onSetShow}>
      {children}
      {show ? <IconArrowUp /> : <IconArrowDown />}
    </div>
  );
};
const Body = ({ children }: { children: any }) => {
  const { show } = useCollapseContext();
  if (!show) {
    return null;
  }

  return <div className="flex flex-col gap-2 p-4 pt-1">{children}</div>;
};
const Collapse = ({ children, isOpen = false, className, onOpenCallBack }: { children: any; isOpen?: boolean; className?: string; onOpenCallBack?: (show: any) => void }) => {
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
        }}
      >
        {children}
      </CollapseContext.Provider>
    </div>
  );
};

export default Object.assign(Collapse, { Header, Body });
