import React, { createContext, ReactNode, useContext } from "react";
import offerService from "api/offer/offer.service";
import { OfferStatus } from "../../../../api/offer/offer.type";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { useAppDispatch } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

interface IOfferContext {
  userInfo?: any;
  offers: any[];

  [key: string]: any;
}

const filterItems = [
  {
    value: null,
    text: "All Offers",
    count: 0,
  },
  {
    value: false,
    text: "Offers Received",
    count: 0,
  },
  {
    value: true,
    text: "Offers Made",
    count: 0,
  },
];

export const OfferContext = createContext<IOfferContext>({} as any);
const OfferProvider = ({ value, children }: { value: IOfferContext; children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [offers, setOffers] = React.useState([] as any);
  const [filterValue, setFilterValue] = React.useState(null);

  const getOffers = React.useMemo(() => {
    if (filterValue === null) {
      return offers;
    }

    return offers.filter((item: any) => item.isOfferMade === filterValue);
  }, [offers, filterValue]);
  const getFilterItems = React.useMemo(() => {
    filterItems[0].count = offers.length;
    filterItems[1].count = offers.filter((item: any) => !item.isOfferMade).length;
    filterItems[2].count = offers.filter((item: any) => item.isOfferMade).length;

    return filterItems;
  }, [offers]);

  const onChangeFilterValue = (value: any) => {
    setFilterValue(value);
  };

  const onCancelAllOffer = async () => {
    try {
      await offerService.cancelAllOffer({ userId: value.userInfo.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onAcceptOffer = async (item: any) => {
    try {
      await offerService.acceptOffer({ id: item.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onCancelOffer = async (item: any) => {
    try {
      await offerService.cancelOffer({ id: item.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateOffer = (item: any) => {
    dispatch(setRightMenu(RightMenuType.UpdateOffer));
    navigate(PATHS.NFT_DETAILS, { nftId: item.tokenId });
  };

  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: value.userInfo.id,
      page: 1,
    });
    const data = response.data.map((item: any) => ({
      ...item,
      isOfferMade: item.makerUserId === value.userInfo.id,
      isActiveOffer: item.status === OfferStatus.ActiveOffer,
      isExpired: item.status === OfferStatus.ExpiredOffer,
      isCanceled: item.status === OfferStatus.Cancelled,
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
