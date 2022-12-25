import React from "react";
import { IconArrowDown, IconArrowUp } from "icons";

const CollapseContext = React.createContext({} as any);
const useCollapseContext = () => React.useContext(CollapseContext);

const Header = ({ children }: { children: any }) => {
  const { setShow, show } = useCollapseContext();

  return (
    <div className="p-4 text-h6 text-white flex justify-between items-center cursor-pointer" onClick={() => setShow((value: any) => !value)}>
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
const Collapse = ({ children }: { children: any }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <div className="border border-gray rounded-md">
      <CollapseContext.Provider
        value={{
          show,
          setShow,
        }}
      >
        {children}
      </CollapseContext.Provider>
    </div>
  );
};

export default Object.assign(Collapse, { Header, Body });
