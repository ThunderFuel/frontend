import React from "react";
import OfferList from "./OfferList";
import { useProfile } from "../../ProfileContext";
import { useAppDispatch, useAppSelector } from "store";
import useNavigate from "hooks/useNavigate";
import { OfferStatus } from "api/offer/offer.type";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";
import userService from "api/user/user.service";
import useToast from "hooks/useToast";
import { RightMenuType, setRightMenu } from "store/NFTDetailsSlice";
import { PATHS } from "router/config/paths";
import offerService from "api/offer/offer.service";
import SidebarFilter from "./SidebarFilter";
import OfferProvider from "./OfferContext";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const Offer = () => {
  const { userInfo, options } = useProfile();
  const { user } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
        if (res.data < item.price) {
          useToast().error("Offer amount exceeds bidder`s available balance. Cannot be accepted until the balance is enough.");
        } else {
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
          cancelOrderIds: [item.id],
          onCheckoutComplete: fetchOffers,
        })
      );
      dispatch(toggleCheckoutModal());
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateOffer = (item: any) => {
    const _item = { ...item, currentOfferItemOffer: item.price };
    delete item.price;

    dispatch(
      setCheckout({
        item: _item,
        type: CheckoutType.UpdateOffer,
        onCheckoutComplete: () => {
          dispatch(setCheckout({ item: {}, cancelOrderIds: [] }));
        },
      })
    );
    dispatch(toggleCheckoutModal());
  };

  const getBidBalance = async (id = userInfo.id) => userService.getBidBalance(id);

  const fetchOffers = async () => {
    const response = await offerService.getOffer({
      userId: userInfo.id,
      page: 1,
      types: [0, 1, 2],
    });
    const data = response.data
      .map((item: any) => {
        const wallerAddress = String(user.id).toLowerCase();
        const isOfferMade = String(item.makerUserId).toLowerCase() == wallerAddress;
        const isTakerMade = String(item.takerUserId).toLowerCase() == wallerAddress;

        return {
          ...item,
          isOfferMade: isOfferMade,
          isActiveOffer: item.status === OfferStatus.ActiveOffer,
          isAccepted: item.status === OfferStatus.AcceptedOffer,
          isExpired: item.status === OfferStatus.ExpiredOffer,
          isCanceled: item.status === OfferStatus.Cancelled,
          showAfterRow: isOfferMade || isTakerMade,
        };
      })
      .sort((a: any, b: any) => b.isActiveOffer - a.isActiveOffer);
    setOffers(data);
  };
  React.useEffect(() => {
    if (userInfo?.id) {
      getBidBalance().then((res) => setBidBalance(res.data));
      fetchOffers();
    }
  }, [userInfo]);

  const contextValue = {
    options,
    offers,
    getOffers,
    filterValue,
    bidBalance,
    onChangeFilterValue,
    onCancelAllOffer,
    onAcceptOffer,
    onCancelOffer,
    onUpdateOffer,
    getBidBalance,
  };

  return (
    <OfferProvider value={contextValue}>
      <div className="flex w-full h-full lg:pl-5">
        {!isMobile ? <SidebarFilter /> : null}
        <OfferList />
      </div>
    </OfferProvider>
  );
};

export default Offer;
