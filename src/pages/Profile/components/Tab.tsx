import React from "react";
import TabBase from "components/Tab";

import { PATHS } from "router/config/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { IconDots } from "icons";
import { useClickOutside } from "hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { CheckoutType, setCheckout, toggleCheckoutModal } from "store/checkoutSlice";

const routes = [
  { path: PATHS.PROFILE_OWNED, name: "Owned" },
  // { path: null, name: "Created" },
  { path: PATHS.PROFILE_LIKED, name: "Liked" },
  { path: PATHS.PROFILE_OFFER, name: "Offers" },
  { path: PATHS.PROFILE_ACTIVITY, name: "Activities" },
];

const getInitTab = () => {
  return routes.slice(1).find((route: any) => location.pathname.search(route.path) > -1)?.path;
};

enum CancelType {
  CancelAllListings,
  CancelAllOffers,
  CancelAllListingsAndOffers,
}

const TabMoreDropdowns = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLLIElement>(null);
  const items = [
    {
      text: "Cancel All Listings",
      type: CancelType.CancelAllListings,
    },
    { text: "Cancel All Offers", type: CancelType.CancelAllOffers },
    { text: "Cancel All Listings and Offers", type: CancelType.CancelAllListingsAndOffers },
  ];

  useClickOutside(containerRef, () => {
    setShow(false);
  });

  const onClick = async (type: CancelType) => {
    if (CancelType.CancelAllListings === type) {
      {
        dispatch(
          setCheckout({
            type: CheckoutType.CancelAllListings,
          })
        );
        dispatch(toggleCheckoutModal());
      }
    } else if (CancelType.CancelAllOffers === type) {
      {
        dispatch(
          setCheckout({
            type: CheckoutType.CancelAllOffers,
          })
        );
        dispatch(toggleCheckoutModal());
      }
    } else if (CancelType.CancelAllListingsAndOffers) {
      {
        dispatch(
          setCheckout({
            type: CheckoutType.CancelAllOffersListings,
          })
        );
        dispatch(toggleCheckoutModal());
      }
    }
  };

  return (
    <li className="relative" ref={containerRef}>
      <span className={show ? "active" : ""} onClick={() => setShow(!show)}>
        <IconDots />
      </span>
      {show ? (
        <ul className="absolute right-0 top-full mt-1 flex flex-col bg-bg border border-gray rounded-[4px] divide-y divide-gray overflow-hidden z-10">
          {items.map((item, k) => {
            return (
              <li key={k} onClick={() => onClick(item.type)} className="flex items-center justify-between cursor-pointer px-4 py-3 text-white hover:bg-bg-light">
                <div className="flex w-full body-medium whitespace-nowrap">{item.text}</div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

const Tab = () => {
  const [initTab, setInitTab] = React.useState(getInitTab());
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    let tmpInitTab = getInitTab();
    if (!tmpInitTab) {
      tmpInitTab = PATHS.PROFILE_OWNED;
    }
    setInitTab(tmpInitTab);
  }, [location]);

  return (
    <div className="border-b border-gray relative z-[21]">
      <div className="inline-flex -my-[1px]">
        <TabBase
          initTab={initTab}
          className="secondary !border-l-0"
          onChange={(item) => {
            if (item !== "more") {
              navigate(item);
            }
          }}
        >
          {routes.map((route: any) => (
            <TabBase.Item id={route.path} key={route.name}>
              {route.name}
            </TabBase.Item>
          ))}
          <TabMoreDropdowns />
        </TabBase>
      </div>
    </div>
  );
};

export default Tab;
