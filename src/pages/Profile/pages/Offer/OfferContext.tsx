import React, { createContext, ReactNode, useContext } from "react";
import offerService from "api/offer/offer.service";
import { OfferStatus } from "api/offer/offer.type";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { useAppDispatch } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { setCheckout } from "store/checkoutSlice";

interface IOfferContext {
  userInfo?: any;
  offers: any[];

  [key: string]: any;
}

export const OfferContext = createContext<IOfferContext>({} as any);
const OfferProvider = ({ value, children }: { value: IOfferContext; children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [offers, setOffers] = React.useState([] as any);
  const [filterValue, setFilterValue] = React.useState({
    offerType: 0,
    offerStatus: [0, 1, 2, 3, 4] as any,
  });

  const getOffers = React.useMemo(() => {
    return offers
      .filter((item: any) => item.isOfferMade === !!filterValue.offerType)
      .filter((item: any) => {
        return (
          (filterValue.offerStatus.includes(1) && item.isActiveOffer) ||
          (filterValue.offerStatus.includes(3) && item.isExpired) ||
          (filterValue.offerStatus.includes(0) && item.isCanceled) ||
          (filterValue.offerStatus.includes(2) && item.isAccepted)
        );
      });
  }, [offers, filterValue]);
  const onChangeFilterValue = (value: any) => {
    setFilterValue((prevState: any) => ({ ...prevState, ...value }));
  };

  const onCancelAllOffer = async () => {
    try {
      //TODO CONTRACT ENTREGRE ET
      await offerService.cancelAllOffer({ userId: value.userInfo.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onAcceptOffer = async (item: any) => {
    try {
      //TODO CONTRACT ENTREGRE ET
      await offerService.acceptOffer({ id: item.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onCancelOffer = async (item: any) => {
    try {
      //TODO CONTRACT ENTREGRE ET
      await offerService.cancelOffer({ id: item.id });
      await fetchOffers();
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateOffer = (item: any) => {
    dispatch(setRightMenu(RightMenuType.UpdateOffer));
    dispatch(setCheckout({ item: item }));
    navigate(PATHS.NFT_DETAILS, { nftId: item.tokenId });
  };

  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: value.userInfo.id,
      page: 1,
      types: [0, 1],
    });
    const data = response.data
      .map((item: any) => ({
        ...item,
        isOfferMade: item.makerUserId === value.userInfo.id,
        isActiveOffer: item.status === OfferStatus.ActiveOffer,
        isAccepted: item.status === OfferStatus.AcceptedOffer,
        isExpired: item.status === OfferStatus.ExpiredOffer,
        isCanceled: item.status === OfferStatus.Cancelled,
      }))
      .sort((a: any, b: any) => b.isActiveOffer - a.isActiveOffer);
    setOffers(data);
  };
  React.useEffect(() => {
    if (value.userInfo?.id) {
      fetchOffers();
    }
  }, [value.userInfo]);

  const contextValue = {
    offers,
    getOffers,
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
