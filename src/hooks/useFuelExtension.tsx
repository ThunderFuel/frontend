import { useFuelet } from "./useFuelet";
import { useFuel } from "./useFuel";
import { useLocalStorage } from "./useLocalStorage";

const storage = useLocalStorage();
const FuelGatewayType = "thunder_fuel_gateway_type";

export enum FUEL_TYPE {
  FUEL,
  FUELET,
}

let gatewayType: any = storage.getItem(FuelGatewayType);

export const useFuelExtension = () => {
  const fuelet = useFuelet()[0];
  const fuel = useFuel()[0];

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
