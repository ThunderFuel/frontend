import { useFuelet } from "./useFuelet";
import { useFuel } from "./useFuel";
import { useLocalStorage } from "./useLocalStorage";

const storage = useLocalStorage();
const FuelGatewayType = "fuelGatewayType";

export enum FUEL_TYPE {
  FUEL,
  FUELET,
}

const gatewayType: any = storage.getItem(FuelGatewayType);
let gateway: any;

export const useFuelExtension = () => {
  const fuelet = useFuelet()[0];
  const fuel = useFuel()[0];
  gateway = gatewayType === FUEL_TYPE.FUELET ? fuelet : fuel;

  const setGatewayType = (type: FUEL_TYPE) => {
    storage.setItem(FuelGatewayType, type);
    gateway = type === FUEL_TYPE.FUELET ? fuelet : fuel;
  };

  return {
    gateway,
    setGatewayType,
  };
};
