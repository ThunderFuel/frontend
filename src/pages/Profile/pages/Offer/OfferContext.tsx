import React, { createContext, ReactNode, useContext } from "react";

interface IOfferContext {
  userInfo?: any;
  offers: any[];

  [key: string]: any;
}

export const OfferContext = createContext<IOfferContext>({} as any);
const OfferProvider = ({ value, children }: { value: IOfferContext; children: ReactNode }) => {
  return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
};

export default OfferProvider;

export const useOfferContext = () => useContext(OfferContext);
