import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  IconActivity,
  IconArrowRight,
  IconCart,
  IconChevronRight,
  IconEthereum,
  IconGas,
  IconHand,
  IconInfo,
  IconLike,
  IconLogout,
  IconSettings,
  IconThunder2,
  IconThunderLogoText,
  IconWallet,
  IconWarning,
} from "icons";
import Search from "./components/Search/Search";
import "./Header.css";
import { useAppDispatch, useAppSelector } from "store";
import MobileSearch from "./components/Search/MobileSearch";
import { toggleCartModal } from "store/cartSlice";
import { setIsConnected, setUser, toggleManageFundsModal, toggleWalletModal } from "store/walletSlice";
import { PATHS } from "router/config/paths";
import Tab from "./components/Tab";
import Avatar from "components/Avatar/Avatar";
import UseNavigate from "hooks/useNavigate";
import SocialMediaIcons from "components/SocialMediaIcons";
import { useDispatch } from "react-redux";
import etherscanService from "api/etherscan/etherscan.service";
import { toggleClosedBetaModal } from "store/commonSlice";
import { useConnectUI } from "@fuels/react";
import Button from "../../../components/Button";
import { addressFormat } from "../../../utils";
import { useWallet } from "../../../hooks/useWallet";
import { useClickOutside } from "../../../hooks/useClickOutside";
import GetTestEth from "../../../components/GetTestEth/GetTestEth";
import { removeAll } from "../../../store/bulkListingSlice";
import { removeBulkItems } from "../../../store/checkoutSlice";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { WalletDropdown } from "components/Wallet/Wallet";

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
        <IconInfo className="w-[18px] h-[18px]" />
        <span className="body-small !text-[12px] !font-medium	">
          Thunder is currently in beta phase. All data and transactions are being conducted on the testnet.{" "}
          <span className="body-small !text-[12px] !font-medium underline cursor-pointer" onClick={() => dispatch(toggleClosedBetaModal())}>
            Learn More
          </span>
        </span>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
HeaderTop.displayName = "HeaderTop";

const HeaderCardBadge = React.memo(({ count }: { count: number }) => {
  return <span className="body-small bg-white flex-center text-black absolute rounded-full w-[22px] h-[22px] -top-1 -right-1 border-[2px] border-bg tracking-normal">{count}</span>;
});

HeaderCardBadge.displayName = "HeaderCardBadge";

const BaseDropdown = ({ children, container }: any) => {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setShow(false);
  });
  const onClick = () => {
    // setShow(!show);
  };

  return (
    <div className="relative" ref={containerRef} onClick={onClick}>
      <div className={clsx("flex items-center p-2 gap-2 cursor-pointer", show ? "bg-gray" : "")}>{children}</div>
      {show ? <div className="absolute top-full right-0 pt-2">{container}</div> : null}
    </div>
  );
};
const BaseDropdownContainer = ({ className, children }: any) => {
  return <div className={clsx("flex flex-col bg-bg border border-gray rounded-2xl gap-2.5 p-4 ", className)}>{children}</div>;
};

const HeaderUserBalance = ({ user, address }: any) => {
  const dispatch = useAppDispatch();
  const formattedAddress = addressFormat(user.walletAddress);
  const { getBalance, getBidBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);
  const fetchBalance = () => {
    getBalance().then((res) => setbalance(res ? res : 0));
  };
  const fetchBidBalance = () => {
    if (user.walletAddress === undefined) return;
    getBidBalance({ contractAddress: user.walletAddress, user: user }).then((res) => {
      setBidBalance(res);
    });
  };

  useEffect(() => {
    fetchBalance();
    fetchBidBalance();
  }, []);

  const container = (
    <BaseDropdownContainer className="w-full lg:w-[432px]">
      <div className="flex items-center justify-between text-gray-light">
        <div className="text-headline-01 uppercase">Wallet</div>
        <div className="flex items-center gap-2.5">
          <div className="body-medium">{formattedAddress}</div>
          <WalletDropdown walletAddress={user.walletAddress} />
        </div>
      </div>
      <div className="flex flex-col border border-gray rounded-lg">
        <div className="flex flex-col p-2.5 gap-2.5">
          <div className="flex justify-between">
            <span className="body-medium !font-medium text-gray-light">Bid Balance</span>
            <span className="flex font-spaceGrotesk text-white">
              {balance.toFixed(2)} <IconEthereum className="text-gray-light font" />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="body-medium !font-medium text-gray-light">Wallet Balance</span>
            <span className="flex font-spaceGrotesk text-white">
              {bidBalance.toFixed(2)} <IconEthereum className="text-gray-light" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 p-4 border-t border-gray">
          <GetTestEth className="btn-sm" user={user} address={address} />
          <Button
            className="btn-secondary w-full"
            onClick={() => {
              dispatch(toggleManageFundsModal());
            }}
          >
            <span className="text-nowrap">MANAGE FUNDS</span>
            <IconArrowRight />
          </Button>
        </div>
      </div>
    </BaseDropdownContainer>
  );

  return (
    <BaseDropdown container={container}>
      <div className="flex px-2">
        {balance.toFixed(2)} <IconEthereum className="text-gray-light" />
      </div>
    </BaseDropdown>
  );
};

const HeaderUserProfileInfo = ({ user }: any) => {
  const dispatch = useAppDispatch();
  const { walletDisconnect } = useWallet();
  const navigate = UseNavigate();
  const formattedAddress = addressFormat(user.walletAddress);
  const items = [
    {
      icon: IconWallet,
      name: "My Profile",
      path: PATHS.PROFILE,
    },
    {
      icon: IconHand,
      name: "Offers",
      path: PATHS.PROFILE_OFFER,
    },
    {
      icon: IconLike,
      name: "Liked",
      path: PATHS.PROFILE_LIKED,
    },
    {
      icon: IconActivity,
      name: "Activity",
      path: PATHS.PROFILE_ACTIVITY,
    },
    {
      icon: IconSettings,
      name: "Settings",
      path: PATHS.SETTINGS_PROFILE,
    },
    {
      icon: IconLogout,
      name: "Logout",
      isLogout: true,
    },
  ];
  const onClick = (item: any) => {
    if (item.isLogout) {
      walletDisconnect();
      dispatch(setIsConnected(false));
      dispatch(setUser({}));
      dispatch(removeAll());
      dispatch(removeBulkItems());
      useLocalStorage().removeItem("connected_account");
    } else {
      navigate(item.path, {});
    }
  };

  const container = (
    <BaseDropdownContainer className="lg:w-[280px] w-full !p-0">
      <div>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name} onClick={() => onClick(item)} className="flex flex-row py-3 px-4 items-center justify-between border-b border-gray cursor-pointer">
              <div className="flex flex-row items-center gap-5">
                <Icon className="w-6 h-6" />
                <span className="body-small !font-bold">{item.name}</span>
              </div>
              <IconChevronRight className="text-gray-light" />
            </div>
          );
        })}
      </div>
    </BaseDropdownContainer>
  );

  return (
    <BaseDropdown container={container}>
      <span className="body-medium">{formattedAddress}</span>
      <Avatar image={user?.image} userId={user?.id} className="w-6 h-6" />
    </BaseDropdown>
  );
};

const HeaderUserProfile = ({ user, address }: any) => {
  return (
    <div className="flex border border-gray rounded-md text-white">
      <HeaderUserBalance user={user} address={address} />
      <HeaderUserProfileInfo user={user} />
    </div>
  );
};

const HeaderIconButtonGroup = React.memo(() => {
  const dispatch = useAppDispatch();
  const { connect } = useConnectUI();

  const selectedCarts = useAppSelector((state) => state.cart.items);
  const { isConnected, user, address } = useAppSelector((state) => state.wallet);

  return (
    <div className="hidden lg:flex gap-2 items-center">
      {isConnected ? (
        <HeaderUserProfile user={user} address={address} />
      ) : (
        <Button className="btn-header-connect" onClick={connect}>
          COnnect
          <IconWallet className="h-[18px] w-[18px]" />
        </Button>
      )}
      <div className="relative">
        <Button className="btn-icon text-white" onClick={() => dispatch(toggleCartModal())}>
          <IconCart className="h-[18px] w-[18px]" />
        </Button>
        {selectedCarts.length > 0 && <HeaderCardBadge count={selectedCarts.length} />}
      </div>
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
            <div className="header-container-fluid h-[71px]">
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
        </>
        <MobileSearch />
      </>
    </header>
  );
};

export default Header;
