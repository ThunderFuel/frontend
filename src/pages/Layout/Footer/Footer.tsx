import React from "react";
import SocialMediaIcons from "components/SocialMediaIcons";
import { useDispatch } from "react-redux";
import etherscanService from "api/etherscan/etherscan.service";
import { IconEthereum, IconGas, IconInfo } from "icons";
import { toggleClosedBetaModal } from "store/commonSlice";

const IntervalValue = 600000;
const FooterBottom = React.memo(() => {
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
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center gap-5 shrink-0 text-headline-01">
          <span className="flex items-center">
            <IconEthereum color="#838383" />
            <span className="text-white">${ethPrice}</span>
          </span>
          <span className="flex items-center">
            <IconGas className="mr-[6px]" />
            <span className="text-white">{gasFee} GWEI</span>
          </span>
        </div>
        <div className="flex w-full pt-[6px] pb-[6px] items-center gap-x-[10px] border-l ml-[27px] border-gray pl-[15px] text-white">
          <IconInfo className="w-[18px] h-[18px]" />
          <span className="body-small !text-[12px] !font-medium	">
            Thunder is currently in beta phase. All data and transactions are being conducted on the testnet.{" "}
            <span className="body-small !text-[12px] !font-medium underline cursor-pointer" onClick={() => dispatch(toggleClosedBetaModal())}>
              Learn More
            </span>
          </span>
        </div>
      </div>
      <SocialMediaIcons />
    </div>
  );
});
FooterBottom.displayName = "FooterBottom";
const Footer = () => {
  return (
    <div className="bg-bg border-t border-t-gray p-4">
      <FooterBottom />
    </div>
  );
};

export default Footer;
