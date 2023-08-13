import React from "react";
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
        <div className="flex items-center gap-4 shrink-0 text-headline-01 border-r border-r-gray py-3 pr-4">
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
  return (
    <div className="bg-bg border-t border-t-gray sticky bottom-0 left-0 w-full">
      <FooterBottom />
    </div>
  );
};

export default Footer;
