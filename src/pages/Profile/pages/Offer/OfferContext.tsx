import React, { createContext, ReactNode, useContext } from "react";
import offerService from "api/offer/offer.service";
import { OfferStatus } from "api/offer/offer.type";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { useAppDispatch } from "store";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import userService from "api/user/user.service";
import useToast from "hooks/useToast";

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
    offerStatus: [] as any,
  });
  const [bidBalance, setBidBalance] = React.useState(null as any);

  const getOffers = React.useMemo(() => {
    return offers
      .filter((item: any) => item.isOfferMade === !!filterValue.offerType)
      .filter((item: any) => {
        if (!filterValue.offerStatus.length) {
          return true;
        }

        return (
          (filterValue.offerStatus.includes(OfferStatus.ActiveOffer) && item.isActiveOffer) ||
          (filterValue.offerStatus.includes(OfferStatus.ExpiredOffer) && item.isExpired) ||
          (filterValue.offerStatus.includes(OfferStatus.Cancelled) && item.isCanceled) ||
          (filterValue.offerStatus.includes(OfferStatus.AcceptedOffer) && item.isAccepted)
        );
      });
  }, [offers, filterValue]);

  const onChangeFilterValue = (value: any) => {
    setFilterValue((prevState: any) => ({ ...prevState, ...value }));
  };

  const onCancelAllOffer = async () => {
    try {
      dispatch(
        setCheckout({
          type: CheckoutType.CancelAllOffers,
          onCheckoutComplete: () => {
            fetchOffers();
          },
        })
      );
      dispatch(toggleCheckoutModal());
    } catch (e) {
      console.log(e);
    }
  };

  const onAcceptOffer = async (item: any) => {
    try {
      userService.getBidBalance(item.makerUserId).then((res) => {
        if (res.data < item.price) useToast().error("Offer amount exceeds bidder`s available balance. Cannot be accepted until the balance is enough.");
        else {
          dispatch(
            setCheckout({
              type: CheckoutType.AcceptOffer,
              item: item,
              price: item.price,
              onCheckoutComplete: fetchOffers,
            })
          );
          dispatch(toggleCheckoutModal());
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onCancelOffer = async (item: any) => {
    try {
      dispatch(
        setCheckout({
          type: CheckoutType.CancelOffer,
          item: item,
          price: item.price,
          onCheckoutComplete: fetchOffers,
        })
      );
      dispatch(toggleCheckoutModal());
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateOffer = (item: any) => {
    dispatch(setRightMenu(RightMenuType.UpdateOffer));
    dispatch(setCheckout({ item: item }));
    navigate(PATHS.NFT_DETAILS, { nftId: item.tokenId });
  };

  const getBidBalance = async () => {
    userService.getBidBalance(value.userInfo.id).then((res) => setBidBalance(res.data));
  };

  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: value.userInfo.id,
      page: 1,
      types: [0, 1, 2],
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
      getBidBalance();
      fetchOffers();
    }
  }, [value.userInfo]);

  const contextValue = {
    offers,
    getOffers,
    filterValue,
    bidBalance,
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
