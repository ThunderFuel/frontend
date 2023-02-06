import React, { createContext, ReactNode, useContext } from "react";
import offerService from "api/offer/offer.service";

interface IOfferContext {
  userInfo?: any;
  offers: any[];

  [key: string]: any;
}

const filterItems = [
  {
    value: true,
    text: "Offers Received",
    count: 0,
  },
  {
    value: false,
    text: "Offers Made",
    count: 0,
  },
];

export const OfferContext = createContext<IOfferContext>({} as any);
const OfferProvider = ({ value, children }: { value: IOfferContext; children: ReactNode }) => {
  const [offers, setOffers] = React.useState([] as any);
  const [filterValue, setFilterValue] = React.useState(true);

  const getOffers = React.useMemo(() => {
    return offers.filter((item: any) => item.isOfferMade === filterValue);
  }, [offers, filterValue]);
  const getFilterItems = React.useMemo(() => {
    filterItems[0].count = offers.filter((item: any) => item.isOfferMade).length;
    filterItems[1].count = offers.filter((item: any) => !item.isOfferMade).length;

    return filterItems;
  }, [offers]);

  const onChangeFilterValue = (value: any) => {
    setFilterValue(value);
  };

  const onCancelAllOffer = async () => {
    try {
      await offerService.cancelAllOffer({ userId: value.userInfo.id });
      setOffers(offers.filter((offer: any) => offer.isOfferMade));
    } catch (e) {
      console.log(e);
    }
  };
  const onAcceptOffer = async (item: any) => {
    try {
      await offerService.cancelOffer({ id: item.id });
    } catch (e) {
      console.log(e);
    }
  };
  const onCancelOffer = async (item: any) => {
    try {
      await offerService.cancelOffer({ id: item.id });
      setOffers(offers.filter((offer: any) => offer.id !== item.id));
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateOffer = () => {
    console.log("onUpdateOffer");
  };

  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: value.userInfo.id,
      page: 1,
    });
    const data = response.data.map((item: any) => ({
      ...item,
      isOfferMade: item.takerUserId === value.userInfo.id,
    }));
    setOffers(data);
  };
  React.useEffect(() => {
    if (value.userInfo?.id) {
      fetchOffers();
    }
  }, [value.userInfo]);

  const contextValue = {
    offers: getOffers,
    filterItems: getFilterItems,
    filterValue,
    onChangeFilterValue,
    onCancelAllOffer,
    onAcceptOffer,
    onCancelOffer,
    onUpdateOffer,
  };

  return <OfferContext.Provider value={contextValue}>{children}</OfferContext.Provider>;
};

export default OfferProvider;

export const useOfferContext = () => useContext(OfferContext);
