import React, { createContext, ReactNode, useContext } from "react";

interface IDropDetailContext {
  dropDetail: {
    className: string;
    banner: string;
    title: string;
    about: string;
    blocks: any;
    team: any;
    roadmap: any;
    faq: any;
    allowListPhase: any;
  };
}

export const DropDetailContext = createContext<IDropDetailContext>({} as any);
const DropDetailProvider = ({ children, value }: { children: ReactNode; value: any }) => {
  return <DropDetailContext.Provider value={value}>{children}</DropDetailContext.Provider>;
};

export default DropDetailProvider;
export const useDropDetailContext = () => useContext(DropDetailContext);
