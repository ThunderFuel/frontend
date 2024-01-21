import React, { useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { IconCart, IconHamburger, IconSearch, IconThunder2, IconThunderLogoText, IconWallet, IconWarning } from "icons";

import Search from "./components/Search/Search";

import "./Header.css";
import { useAppDispatch, useAppSelector } from "store";
import { onToggle } from "store/mobileSearchSlice";
import MobileSearch from "./components/Search/MobileSearch";
import { toggleCartModal } from "store/cartSlice";
import { toggleWalletModal } from "store/walletSlice";
import { PATHS } from "router/config/paths";
import Tab from "./components/Tab";
import Avatar from "components/Avatar/Avatar";
import UseNavigate from "hooks/useNavigate";

const HeaderCardBadge = React.memo(({ count }: { count: number }) => {
  return <span className="font-spaceGrotesk font-bold bg-white flex-center text-black absolute rounded-full w-[22px] h-[22px] -top-1 -right-1 border-[2px] border-bg tracking-normal">{count}</span>;
});

HeaderCardBadge.displayName = "HeaderCardBadge";

const HeaderIconButtonGroup = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = UseNavigate();

  const selectedCarts = useAppSelector((state) => state.cart.items);
  const { isConnected, user } = useAppSelector((state) => state.wallet);

  return (
    <div className="hidden lg:flex divide-x divide-gray border-l border-l-gray lg:border-l-0 lg:border-r lg:border-gray">
      <HeaderIconButton className="lg:hidden" onClick={() => dispatch(onToggle())}>
        <IconSearch />
      </HeaderIconButton>
      {isConnected && (
        <HeaderIconButton className="hidden lg:flex p-[18px]" onClick={() => navigate(PATHS.PROFILE, {})}>
          <Avatar image={user?.image} userId={user?.id} className="w-9 h-9" />
        </HeaderIconButton>
      )}
      <HeaderIconButton className="hidden lg:flex" onClick={() => dispatch(toggleWalletModal())}>
        <IconWallet className={clsx("h-[30px] w-[30px]", isConnected ? "text-white" : "text-gray-light")} />
      </HeaderIconButton>
      <HeaderIconButton className="relative" onClick={() => dispatch(toggleCartModal())}>
        <div className="relative">
          <IconCart height="30px" width="30px" />
          {selectedCarts.length > 0 && <HeaderCardBadge count={selectedCarts.length} />}
        </div>
      </HeaderIconButton>
      <HeaderIconButton className="lg:hidden">
        <IconHamburger />
      </HeaderIconButton>
    </div>
  );
});

HeaderIconButtonGroup.displayName = "HeaderIconButtonGroup";

const HeaderIconButton = React.memo((props: any) => {
  return (
    <button className={clsx("header-btn", props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  );
});
HeaderIconButton.displayName = "HeaderIconButton";

const HeaderWarning = () => {
  return (
    <div className="hidden lg:flex-center text-orange border-y border-orange py-1">
      <IconWarning />
      <div className="body-small flex gap-0.5">
        <span>Thunder is transitioning to Fuel Beta-4 Testnet. All transactions are currently on hold. Patience ⚡</span>
        <a href="https://twitter.com/ThunderbyFuel/status/1717210636285882874?s=20" target="_blank" className="font-bold underline" rel="noreferrer">
          Learn more.
        </a>
      </div>
    </div>
  );
};

const Header = () => {
  const ref = useRef<any>(null);

  const setHeaderHeight = () => {
    const cssRoot = document.querySelector(":root");
    if (cssRoot) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cssRoot.style.setProperty("--headerHeight", `${ref.current?.offsetHeight || 0}px`);
    }
  };

  React.useLayoutEffect(() => {
    setHeaderHeight();
    window.addEventListener("resize", () => setHeaderHeight());

    return () => {
      window.removeEventListener("resize", () => setHeaderHeight());
    };
  }, [ref.current]);

  return (
    <header id="layout-header" className={clsx("sticky top-0 z-30 bg-bg")} ref={ref}>
      <>
        <>
          <div className="border-y border-gray">
            <div className="header-container-fluid">
              <div className="flex items-center gap-5 lg:gap-6 flex-1 lg:pr-6">
                <Link className="flex items-center text-white gap-1" to={PATHS.MARKETPLACE}>
                  <IconThunder2 className="w-14" />
                  <IconThunderLogoText className="hidden lg:flex" />
                </Link>
                <Tab />
                <Search />
              </div>
              <HeaderIconButtonGroup />
            </div>
          </div>
          <HeaderWarning />
        </>
        <MobileSearch />
      </>
    </header>
  );
};

export default Header;
