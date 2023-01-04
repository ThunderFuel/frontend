import { useAppSelector } from "store";

export const useWallet = () => {
  if (!window.fuel) {
    // throw new Error("Fuel Wallet extension is not installed!");
  }
  const wallet = useAppSelector((state) => state.wallet);

  return wallet;
};
