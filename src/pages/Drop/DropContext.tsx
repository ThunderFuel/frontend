import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import dropService from "../../api/drop/drop.service";

interface IDropDetailContext {
  dropDetail: {
    className: string;
    banner: string;
    title: string;
    about: string;
    blocks: any;
  };
}

export const DropDetailContext = createContext<IDropDetailContext>({} as any);
const DropDetailProvider = ({ children }: { children: ReactNode }) => {
  const [dropDetail, setDropDetail] = useState<any>({});
  useEffect(() => {
    dropService.getDropPrimary().then((responseDrop: any) => {
      setDropDetail(responseDrop);

      document.body.classList.add(responseDrop.className);
    });

    return () => {
      document.body.classList.remove(dropDetail.className);
    };
  }, []);

  const value = {
    dropDetail,
  };

  return <DropDetailContext.Provider value={value}>{children}</DropDetailContext.Provider>;
};

export default DropDetailProvider;
export const useDropDetailContext = () => useContext(DropDetailContext);
