import { useLocalStorage } from "./useLocalStorage";
import FueletProvider from "../providers/FueletProvider";
import FuelProvider from "../providers/FuelProvider";
import WagmiProvider from "providers/WagmiProvider";

const storage = useLocalStorage();
const FuelGatewayType = "thunder_fuel_gateway_type";

export enum FUEL_TYPE {
  FUEL = "fuel",
  FUELET = "fuelet",
  WAGMI_METAMASK = "wagmi_metamask",
  WAGMI_COINBASE = "wagmi_coinbase",
  WAGMI_WALLETCONNECT = "wagmi_walletconnect",
  LIT_GOOGLE_AUTH = "lit_google_auth",
  LIT_DISCORD_AUTH = "lit_discord_auth",
}

let gatewayType: any = storage.getItem(FuelGatewayType);

export const useFuelExtension = () => {
  const fuelet = new FueletProvider();
  const fuel = new FuelProvider();
  const wagmi = new WagmiProvider();

  const setGatewayType = (type: FUEL_TYPE) => {
    storage.setItem(FuelGatewayType, type);
    gatewayType = type;
  };
  const clearGatewayType = () => {
    storage.removeItem(FuelGatewayType);
    gatewayType = null;
  };

  return {
    selectedGateway: () => {
      return {
        [FUEL_TYPE.FUEL]: fuel,
        [FUEL_TYPE.FUELET]: fuelet,
        [FUEL_TYPE.WAGMI_METAMASK]: wagmi,
        [FUEL_TYPE.WAGMI_COINBASE]: wagmi,
        [FUEL_TYPE.WAGMI_WALLETCONNECT]: wagmi,
        [FUEL_TYPE.LIT_GOOGLE_AUTH]: wagmi,
        [FUEL_TYPE.LIT_DISCORD_AUTH]: wagmi,
      }[gatewayType as FUEL_TYPE];
    },
    setGatewayType,
    clearGatewayType,
  };
};
