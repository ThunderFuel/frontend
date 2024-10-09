import { useLocalStorage } from "./useLocalStorage";
import WagmiProvider from "providers/WagmiProvider";
import { useFuel } from 'hooks/useFuel';
import { useState } from 'react';

const storage = useLocalStorage();
const FuelGatewayType = "thunder_fuel_gateway_type";

export enum FUEL_TYPE {
  FUEL = "fuel",
  FUELET = "fuelet",
  // FUEL_WALLETCONNECT = "fuel_walletconnect",
  WAGMI_METAMASK = "wagmi_metamask",
  WAGMI_COINBASE = "wagmi_coinbase",
  WAGMI_WALLETCONNECT = "wagmi_walletconnect",
  LIT_GOOGLE_AUTH = "lit_google_auth",
  LIT_DISCORD_AUTH = "lit_discord_auth",
}

let gatewayType: any = storage.getItem(FuelGatewayType);

export const useFuelExtension = () => {

  const { fuel } = useFuel();

  // Anything ouside useState, useCallback or useEffect will be called on each render
  // Best practice is to use the hook inside the useState, useMemo or useEffect
  const [wagmi, _] = useState(() => new WagmiProvider());

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
        [FUEL_TYPE.FUELET]: fuel,
        // [FUEL_TYPE.FUEL_WALLETCONNECT]: fuel,
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
