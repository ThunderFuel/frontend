import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import { useAppDispatch, useAppSelector } from "store";
import { setIsConnected, setUser, toggleManageFundsModal } from "store/walletSlice";
import { IconActivity, IconArrowRight, IconChevronRight, IconCopy, IconDots, IconEthereum, IconFaucet, IconLike, IconLink, IconLogout, IconOffer, IconSettings, IconWallet } from "icons";
import Button from "components/Button";
import { useWallet } from "hooks/useWallet";
import { addressFormat, clipboardCopy, openInNewTab } from "utils";
import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";
import Avatar from "components/Avatar";
import { removeAll } from "store/bulkListingSlice";
import { removeBulkItems } from "store/checkoutSlice";
import { FUEL_FAUCET_URL, fueldExplorerLink, lineaExplorerLink } from "global-constants";
import { useLocalStorage } from "hooks/useLocalStorage";
import config from "config";
import useToast from "hooks/useToast";
import { useClickOutside } from "hooks/useClickOutside";
import clsx from "clsx";

function clipboardCopyWrapper(walletAddress: any) {
  clipboardCopy(walletAddress);
  useToast().success("Copied to clipboard.");
}

const WalletDropdown = ({ walletAddress, onLogout }: any) => {
  const [show, setShow] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const items = [
    {
      text: "Copy Address",
      icon: IconCopy,
      onClick: () => {
        clipboardCopyWrapper(walletAddress);
        setShow(false);
      },
    },
    {
      text: "See on Block Explorer",
      icon: IconLink,
      onClick: () => {
        openInNewTab(`${config.getConfig("type") === "wagmi" ? lineaExplorerLink : fueldExplorerLink}${walletAddress}`);
        setShow(false);
      },
    },
    {
      text: "Logout",
      icon: IconLogout,
      onClick: () => {
        onLogout();
        setShow(false);
      },
    },
  ];
  useClickOutside(containerRef, () => {
    setShow(false);
  });

  return (
    <div className="relative" ref={containerRef}>
      <IconDots className={clsx("cursor-pointer hover:text-white", show ? "text-white" : "text-gray-light")} onClick={() => setShow(!show)} />
      {show ? (
        <ul className="absolute top-full right-0 mt-1 flex flex-col bg-bg border border-gray rounded divide-y divide-gray overflow-hidden">
          {items.map((item, k) => {
            return (
              <li key={k} onClick={item.onClick} className="flex items-center text-white hover:bg-bg-light gap-7 py-[14px] pr-3 pl-4 w-full justify-between cursor-pointer">
                <span className="flex body-medium whitespace-nowrap">{item.text}</span>
                <item.icon className="w-5 h-5" />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

const Wallet = ({ show, onClose }: { show: boolean; onClose: any }) => {
  const dispatch = useAppDispatch();
  const navigate = UseNavigate();
  const { user, address } = useAppSelector((state) => state.wallet);
  const { walletDisconnect, getBalance, getBidBalance } = useWallet();
  const [balance, setbalance] = useState<number>(0);
  const [bidBalance, setBidBalance] = useState<number>(0);

  function fetchBalance() {
    getBalance().then((res) => setbalance(res ? res : 0));
  }
  function fetchBidBalance() {
    if (user.walletAddress === undefined) return;
    getBidBalance({ contractAddress: user.walletAddress, user: user }).then((res) => {
      setBidBalance(res);
    });
  }

  useEffect(() => {
    if (!show) return;
    fetchBalance();
    fetchBidBalance();
  }, [show]);

  const MenuItems = [
    {
      title: "My Profile",
      icon: <IconWallet />,
      onClick: () => {
        navigate(PATHS.PROFILE, {});
        onClose();
      },
    },
    // { title: "Create", icon: <IconToken />, onClick: () => "" },
    {
      title: "Offers",
      icon: <IconOffer />,
      onClick: () => {
        navigate(PATHS.PROFILE_OFFER, {});
        onClose();
      },
    },
    {
      title: "Activity",
      icon: <IconActivity />,
      onClick: () => {
        navigate(PATHS.PROFILE_ACTIVITY, {});
        onClose();
      },
    },
    {
      title: "Liked",
      icon: <IconLike />,
      onClick: () => {
        navigate(PATHS.PROFILE_LIKED, {});
        onClose();
      },
    },
    {
      title: "Settings",
      icon: <IconSettings />,
      onClick: () => {
        navigate(PATHS.SETTINGS_PROFILE, {});
        onClose();
      },
    },
  ];

  const WalletMenu = () => {
    return (
      <div className="flex flex-col border border-gray rounded-lg">
        {MenuItems.map((item) => (
          <div
            key={item.title}
            onClick={item.onClick}
            className="flex items-center p-[15px] gap-5 cursor-pointer text-h6 text-white border-b border-gray last:border-none hover:bg-bg-light group/WalletMenuItem"
          >
            {item.icon}
            {item.title}
            <IconChevronRight className="text-gray-light ml-auto group-hover/WalletMenuItem:text-white" />
          </div>
        ))}
      </div>
    );
  };

  // const WalletModalFooter = (
  //   <div className="flex mt-auto flex-col p-5 gap-y-2.5">
  //     <Balances />

  //     <div className="grid grid-cols-2 gap-x-2.5">
  //       <a target="_blank" rel="noreferrer" href={`${FUEL_FAUCET_URL}/?address=${user?.walletAddress ?? user?.contractAddress ?? address}`} className="btn btn-primary w-full">
  //         GET TEST ETH <IconFaucet />
  //       </a>
  //       <Button
  //         className="btn-secondary w-full"
  //         onClick={() => {
  //           onClose();
  //           dispatch(toggleManageFundsModal());
  //         }}
  //       >
  //         MANAGE FUNDS <IconArrowRight />
  //       </Button>
  //       {/* <a className="btn first-letter:btn-secondary w-full" href="https://bridge.linea.build/" target="_blank" rel="noreferrer">
  //         Bridge to Linea <IconSwap />
  //       </a> */}
  //     </div>
  //   </div>
  // );

  function handleLogout() {
    walletDisconnect();
    dispatch(setIsConnected(false));
    dispatch(setUser({}));
    dispatch(removeAll());
    dispatch(removeBulkItems());
    useLocalStorage().removeItem("connected_account");
    onClose();
  }

  const WalletBalances = () => (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-gray-light">
        <span className="text-headline-01 uppercase">wallet</span>
        <div className="flex items-center gap-2.5">
          <span className="body-medium">{addressFormat(user?.walletAddress)}</span>
          <WalletDropdown walletAddress={user?.walletAddress} onLogout={handleLogout} />
        </div>
      </div>
      <div className="flex flex-col border border-gray rounded-lg">
        <div className="flex flex-col gap-2.5 p-[15px]">
          <div className="flex items-center justify-between">
            <h6 className="text-h6 text-gray-light">Bid Balance</h6>
            <h6 className="flex items-center text-h6 text-white">
              {bidBalance}
              <IconEthereum className="text-gray-light" />
            </h6>
          </div>
          <div className="flex items-center justify-between">
            <h6 className="text-h6 text-gray-light">Wallet Balance</h6>
            <h6 className="flex items-center text-h6 text-white">
              {balance}
              <IconEthereum className="text-gray-light" />
            </h6>
          </div>
        </div>
        <div className="grid p-[15px] grid-cols-2 gap-2.5 border-t border-gray">
          <a target="_blank" rel="noreferrer" href={`${FUEL_FAUCET_URL}/?address=${user?.walletAddress ?? user?.contractAddress ?? address}`} className="btn btn-primary w-full">
            GET TEST ETH <IconFaucet />
          </a>
          <Button
            className="btn-secondary w-full"
            onClick={() => {
              onClose();
              dispatch(toggleManageFundsModal());
            }}
          >
            MANAGE FUNDS <IconArrowRight />
          </Button>
          {/* <a className="btn first-letter:btn-secondary w-full" href="https://bridge.linea.build/" target="_blank" rel="noreferrer">
          Bridge to Linea <IconSwap />
        </a> */}
        </div>
      </div>
    </div>
  );

  return (
    <Modal className="cart" title="Wallet" onClose={onClose} show={show}>
      <div className="flex flex-col p-5 gap-5">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 group">
              <h4 className="text-h4 text-green">{user?.userName ?? addressFormat(user?.walletAddress ?? "")}</h4>
              <div className="flex items-center cursor-pointer gap-1.5 group" onClick={() => clipboardCopyWrapper(user?.walletAddress ?? "")}>
                <IconCopy className="w-5 h-5 text-gray group-hover:text-white" />
                <span className="hidden group-hover:flex text-gray-light text-headline-01 uppercase">copy</span>
              </div>
            </div>
            <h6 className="flex items-center gap text-h6 text-gray-light">
              {balance.toFixed(5)} <IconEthereum />
            </h6>
            <div
              className="flex items-center w-fit gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light"
              onClick={handleLogout}
            >
              <IconLogout className="w-[15px] h-[15px]" />
              Logout
            </div>
            {/* <div className="flex gap-x-2.5">
              <a
                target="_blank"
                rel="noreferrer"
                href={`${config.getConfig("type") === "wagmi" ? lineaExplorerLink : fueldExplorerLink}${user?.walletAddress}`}
                className="flex items-center gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light"
              >
                <IconLink className="w-[15px] h-[15px]" />
                {addressFormat(user?.walletAddress)}
              </a>
              <div
                className="flex items-center gap-x-1 p-1.5 cursor-pointer rounded-[5px] text-bodyMd text-gray-light border border-gray hover:text-white hover:bg-bg-light"
                onClick={() => {
                  walletDisconnect();
                  dispatch(setIsConnected(false));
                  dispatch(setUser({}));
                  dispatch(removeAll());
                  dispatch(removeBulkItems());
                  useLocalStorage().removeItem("connected_account");
                  onClose();
                }}
              >
                <IconLogout className="w-[15px] h-[15px]" />
                Logout
              </div>
            </div> */}
          </div>
          <Avatar image={user?.image} userId={user?.id} className="w-12 h-12" />
        </div>
        <WalletMenu />
        <WalletBalances />
      </div>
    </Modal>
  );
};

export default Wallet;
