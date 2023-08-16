import { useLocalStorage } from "./useLocalStorage";
import FueletProvider from "../providers/FueletProvider";
import FuelProvider from "../providers/FuelProvider";

const storage = useLocalStorage();
const FuelGatewayType = "thunder_fuel_gateway_type";

export enum FUEL_TYPE {
  FUEL,
  FUELET,
}

let gatewayType: any = storage.getItem(FuelGatewayType);

export const useFuelExtension = () => {
  const fuelet = new FueletProvider();
  const fuel = new FuelProvider();

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
      return [fuel, fuelet][gatewayType];
    },
    setGatewayType,
    clearGatewayType,
  };
};
