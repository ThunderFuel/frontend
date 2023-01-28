import { ethers } from "ethers";

export const useEthers = () => {
  const BigNumber = (num: any) => {
    const x = ethers.BigNumber.from(num);
    console.log(x);

    return ethers.BigNumber.from(num);
  };

  return {
    BigNumber,
  };
};
