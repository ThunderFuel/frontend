import React, { useRef } from "react";
import SocialMediaIcons from "components/SocialMediaIcons";
import etherscanService from "api/etherscan/etherscan.service";
import { IconEthereum, IconGas, IconSun } from "icons";

const IntervalValue = 600000;
const FooterBottom = React.memo(() => {
  const [gasFee, setGasFee] = React.useState<any>(0);
  const [ethPrice, setEthPrice] = React.useState(0);

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
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center border-r border-r-gray">
        <div className="flex items-center gap-4 shrink-0 text-headline-01 border-r border-r-gray py-2 pr-4">
          <span className="flex items-center">
            <IconEthereum color="#838383" />
            <span className="text-white">${ethPrice}</span>
          </span>
          <span className="flex items-center">
            <IconGas className="mr-[6px]" />
            <span className="text-white">{gasFee} GWEI</span>
          </span>
        </div>
        <div className="px-3">
          <IconSun className="text-white" />
        </div>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
FooterBottom.displayName = "FooterBottom";
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
    <div className="bg-bg border-t border-t-gray sticky bottom-0 left-0 w-full z-20" ref={ref}>
      <FooterBottom />
    </div>
  );
};

export default Footer;
