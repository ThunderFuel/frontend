import React, { useRef } from "react";
import SocialMediaIcons from "components/SocialMediaIcons";
import etherscanService from "api/etherscan/etherscan.service";
import { IconCart, IconCollections, IconDrops, IconEthereum, IconGas, IconHome, IconMoon, IconSun, IconWallet } from "icons";
import { useLocalStorage } from "hooks/useLocalStorage";
import { THUNDER_THEME_NAME } from "global-constants";
import { useIsMobile } from "hooks/useIsMobile";
import useNavigate from "hooks/useNavigate";
import { PATHS } from "router/config/paths";

import "./Footer.css";

const IntervalValue = 600000;
const FooterBottom = React.memo(() => {
  const [isDarkMode, setIsDarkModa] = React.useState<boolean>(true);
  const [gasFee, setGasFee] = React.useState<any>(0);
  const [ethPrice, setEthPrice] = React.useState<any>(0);

  const getData = async () => {
    const response = await etherscanService.getData();

    setEthPrice(parseFloat(response.result.ethusd).toFixed(2));
    setGasFee(response.result.safeGasPrice);
  };

  const onChangeMode = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      useLocalStorage().setItem(THUNDER_THEME_NAME, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      useLocalStorage().setItem(THUNDER_THEME_NAME, "light");
    }
    setIsDarkModa(!isDarkMode);
  };

  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, IntervalValue);

    setIsDarkModa(useLocalStorage().getItem(THUNDER_THEME_NAME) === "dark");

    return () => clearInterval(interval);
  }, []);
  const Icon = isDarkMode ? IconSun : IconMoon;

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center border-r border-r-gray">
        <div className="flex items-center gap-4 shrink-0 text-headline-01 border-r border-r-gray py-2 pr-4">
          <span className="flex items-center">
            <IconEthereum className="text-gray-light" />
            <span className="text-white">${ethPrice}</span>
          </span>
          <span className="flex items-center">
            <IconGas className="mr-[6px] text-gray-light" />
            <span className="text-white">{gasFee} GWEI</span>
          </span>
        </div>
        <div className="px-3 cursor-pointer" onClick={onChangeMode}>
          <Icon className="text-white" />
        </div>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
FooterBottom.displayName = "FooterBottom";

const FooterMobileBottom = React.memo(() => {
  const [initLocation, setInitLocation] = React.useState<any>(location.pathname);
  const navigate = useNavigate();

  const menus = [
    {
      icon: IconHome,
      path: PATHS.MARKETPLACE,
      onClick: () => {
        navigate(PATHS.MARKETPLACE);
        setInitLocation(PATHS.MARKETPLACE);
      },
    },
    {
      icon: IconCollections,
      path: PATHS.RANKINGS,
      onClick: () => {
        navigate(PATHS.RANKINGS);
        setInitLocation(PATHS.RANKINGS);
      },
    },
    {
      icon: IconDrops,
      path: PATHS.DROPS,
      onClick: () => {
        navigate(PATHS.DROPS);
        setInitLocation(PATHS.DROPS);
      },
    },
    {
      icon: IconWallet,
      onClick: () => navigate(PATHS.LOGIN),
    },
    {
      icon: IconCart,
      onClick: () => navigate(PATHS.DROPS),
    },
  ];

  return (
    <div className="mobile-nav">
      {menus.map((menu, i) => {
        const Icon = menu.icon ?? React.Fragment;

        return (
          <div key={i} onClick={menu.onClick} className={menu.path === initLocation ? "active" : ""}>
            <Icon />
          </div>
        );
      })}
    </div>
  );
});
FooterMobileBottom.displayName = "FooterMobileBottom";

const Footer = () => {
  const ref = useRef<any>(null);
  const setFooterHeight = () => {
    const cssRoot = document.querySelector(":root");
    if (cssRoot) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cssRoot.style.setProperty("--footerHeight", `${ref.current?.offsetHeight || 0}px`);
    }
  };

  React.useLayoutEffect(() => {
    setFooterHeight();
    window.addEventListener("resize", () => setFooterHeight());

    return () => {
      window.removeEventListener("resize", () => setFooterHeight());
    };
  }, [ref.current]);

  return (
    <div className="bg-bg border-t border-t-gray fixed bottom-0 left-0 w-full z-20" ref={ref}>
      {useIsMobile() ? <FooterMobileBottom /> : <FooterBottom />}
    </div>
  );
};

export default Footer;
