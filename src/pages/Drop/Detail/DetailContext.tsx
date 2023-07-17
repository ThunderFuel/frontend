import React, { createContext, ReactNode, useContext } from "react";

interface IDropDetailContext {
  dropDetail: {
    className: string;
    bannerImage: string;
    bannerVideo: string;
    title: string;
    about: string;
    blocks: any;
    team: any;
    roadMap: any;
    faq: any;
    allowListPhase: any;
    creator: any;
    id?: number;
  };
}

export const DropDetailContext = createContext<IDropDetailContext>({} as any);
const DropDetailProvider = ({ children, value }: { children: ReactNode; value: any }) => {
  return <DropDetailContext.Provider value={value}>{children}</DropDetailContext.Provider>;
};

export default DropDetailProvider;
export const useDropDetailContext = () => useContext(DropDetailContext);
