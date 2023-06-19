import { ethers } from "ethers";

export const useEthers = () => {
  const BigNumber = (num: any) => {
    return ethers.BigNumber.from(num);
  };

  return {
    BigNumber,
  };
};
