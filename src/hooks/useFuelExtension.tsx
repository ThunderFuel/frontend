import { useGatewayStore } from "../store/gatewayStore";
import { useFuel } from "hooks/useFuel";
import { useEffect, useMemo } from "react";
import WagmiProvider from "providers/WagmiProvider";
import { useDispatch } from "react-redux";
import FuelProvider from "providers/FuelProvider";
import type { Action } from "redux";
import { useCurrentConnector } from "@fuels/react";

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

interface Gateway {
  selectedGateway: FuelProvider | WagmiProvider<Action> | undefined;
  setGatewayType: (type: FUEL_TYPE) => void;
  clearGatewayType: () => void;
  gateway: "fuel" | "wagmi";
  wagmiGateway: WagmiProvider<Action> | undefined;
  fuelGateway: FuelProvider | undefined;
}

export const useFuelExtension = (): Gateway => {
  const { gatewayType, setGatewayType, clearGatewayType } = useGatewayStore();
  const { fuel } = useFuel();
  const dispatch = useDispatch();
  const { currentConnector } = useCurrentConnector();
  const isExternal = currentConnector?.external;

  // Workaround, ideally everything should be fetched from connectors data
  useEffect(() => {
    setGatewayType(isExternal ? FUEL_TYPE.WAGMI_METAMASK : FUEL_TYPE.FUELET);
  }, [isExternal, setGatewayType]);

  const gateway = useMemo(() => {
    switch (gatewayType) {
      case FUEL_TYPE.WAGMI_METAMASK:
      case FUEL_TYPE.WAGMI_COINBASE:
      case FUEL_TYPE.WAGMI_WALLETCONNECT:
      case FUEL_TYPE.LIT_GOOGLE_AUTH:
      case FUEL_TYPE.LIT_DISCORD_AUTH:
        return "wagmi";
      case FUEL_TYPE.FUEL:
      case FUEL_TYPE.FUELET:
        return "fuel";
      default:
        return "fuel";
    }
  }, [gatewayType]);
  const wagmiProvider = useMemo(() => new WagmiProvider(dispatch), [dispatch]);
  const fuelProvider = useMemo(() => (fuel ? new FuelProvider(fuel) : undefined), [fuel]);

  if (isExternal) {
    return {
      setGatewayType,
      clearGatewayType,
      gateway,
      selectedGateway: wagmiProvider,
      fuelGateway: fuelProvider,
      wagmiGateway: wagmiProvider,
    };
  }

  return {
    setGatewayType,
    clearGatewayType,
    gateway,
    selectedGateway: fuelProvider,
    fuelGateway: fuelProvider,
    wagmiGateway: wagmiProvider,
  };
};
