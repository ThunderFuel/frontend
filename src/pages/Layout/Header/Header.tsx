/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { AssetLogo, AssetThunderText } from "assets";
import { IconCart, IconEthereum, IconGas, IconHamburger, IconInfo, IconSearch, IconThunder2, IconWallet, IconWarning } from "icons";

import SocialMediaIcons from "components/SocialMediaIcons";

import Search from "./components/Search/Search";

import "./Header.css";
import { useAppDispatch, useAppSelector } from "store";
import { onToggle } from "store/mobileSearchSlice";
import MobileSearch from "./components/Search/MobileSearch";
import { toggleCartModal } from "store/cartSlice";
import { toggleWalletModal } from "store/walletSlice";
import { PATHS } from "router/config/paths";
import { useIsMobile } from "hooks/useIsMobile";
import etherscanService from "api/etherscan/etherscan.service";
import { useDispatch } from "react-redux";
import { toggleClosedBetaModal } from "store/commonSlice";
import Tab from "./components/Tab";
import Avatar from "components/Avatar/Avatar";
import UseNavigate from "hooks/useNavigate";

const IntervalValue = 600000;
const HeaderTop = React.memo(() => {
  const [gasFee, setGasFee] = React.useState<any>(0);
  const [ethPrice, setEthPrice] = React.useState(0);
  const dispatch = useDispatch();

  const getData = async () => {
    const response = await etherscanService.getData();

    setEthPrice(response.result.ethusd);
    setGasFee(response.result.safeGasPrice);
  };

  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, IntervalValue);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 flex  items-center">
      <div className="flex items-center  gap-5 shrink-0 text-headline-01">
        <span className="flex items-center">
          <IconEthereum color="#838383" />
          <span className="text-white">${ethPrice}</span>
        </span>
        <span className="flex items-center">
          <IconGas className="mr-[6px]" />
          <span className="text-white">{gasFee} GWEI</span>
        </span>
      </div>
      <div className="flex w-full pt-[6px] pb-[6px] h-[30px] items-center gap-x-[10px] border-l ml-[27px] border-gray pl-[15px] text-white">
        {/* <IconInfo className="w-[18px] h-[18px]" />
        <span className="body-small !text-[12px] !font-medium	">
          Thunder is currently in beta phase. All data and transactions are being conducted on the testnet.{" "}
          <span className="body-small !text-[12px] !font-medium underline cursor-pointer" onClick={() => dispatch(toggleClosedBetaModal())}>
            Learn More
          </span>
        </span> */}
      </div>
      <SocialMediaIcons />
    </div>
  );
});
HeaderTop.displayName = "HeaderTop";

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
    <div className="flex divide-x divide-gray border-l border-l-gray lg:border-l-0 lg:border-r lg:border-gray">
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
    <div className="flex-center text-orange border-y border-orange py-1">
      <IconWarning />
      <div className="body-small flex gap-0.5">
        <span>Thunder is transitioning to Fuel Beta-5 Testnet. All transactions are currently on hold. Patience ⚡</span>
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
      {!useIsMobile() ? (
        <>
          <HeaderTop />
          <div className="border-y border-gray">
            <div className="header-container-fluid">
              <div className="flex items-center gap-6 pr-6">
                <Link className="flex text-white gap-1" to={PATHS.MARKETPLACE}>
                  <IconThunder2 className="w-14" />
                  <img className="hidden lg:flex" src={AssetThunderText} alt={AssetThunderText} />
                </Link>

                <Search />
                <Tab />
              </div>
              <HeaderIconButtonGroup />
            </div>
            <HeaderWarning />
          </div>
          <MobileSearch />
        </>
      ) : (
        <div className="border-y border-gray">
          <div className="header-container-fluid">
            <div className="flex items-center py-5">
              <img src={AssetLogo} className="h-8" alt="logo" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
