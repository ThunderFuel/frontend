import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import dropService from "../../api/drop/drop.service";
import { useParams } from "react-router-dom";

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
  };
}

export const DropDetailContext = createContext<IDropDetailContext>({} as any);
const DropDetailProvider = ({ children }: { children: ReactNode }) => {
  const { dropId } = useParams();

  const [dropDetail, setDropDetail] = useState<any>({
    team: [],
    roadmap: [],
  });
  useEffect(() => {
    dropService.getDropPrimary(dropId).then((responseDrop: any) => {
      setDropDetail(responseDrop);

      document.body.classList.add("drop", responseDrop.className);
    });

    return () => {
      document.body.classList.remove("drop", dropDetail.className);
    };
  }, [dropId]);

  const value = {
    dropDetail,
  };

  return <DropDetailContext.Provider value={value}>{children}</DropDetailContext.Provider>;
};

export default DropDetailProvider;
export const useDropDetailContext = () => useContext(DropDetailContext);
