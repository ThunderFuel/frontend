import { useLocalStorage } from "./useLocalStorage";
import FueletProvider from "../providers/FueletProvider";
import FuelProvider from "../providers/FuelProvider";
import WagmiProvider from "providers/WagmiProvider";

const storage = useLocalStorage();
const FuelGatewayType = "thunder_fuel_gateway_type";

export enum FUEL_TYPE {
  FUEL,
  FUELET,
  WAGMI,
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
      return [fuel, fuelet, wagmi][gatewayType];
    },
    setGatewayType,
    clearGatewayType,
  };
};
