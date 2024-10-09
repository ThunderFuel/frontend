import { useGatewayStore } from '../store/gatewayStore';
import { useFuel } from 'hooks/useFuel';
import { useMemo, useState } from 'react';
import WagmiProvider from 'providers/WagmiProvider';
import { Fuel } from 'fuels';

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



interface WagmiGateway {
  fuelGateway: undefined;
  wagmiGateway: WagmiProvider | undefined;
  setGatewayType: (type: FUEL_TYPE) => void;
  clearGatewayType: () => void;
}

interface FuelGateway {
  fuelGateway: Fuel | undefined;
  wagmiGateway: undefined;
  setGatewayType: (type: FUEL_TYPE) => void;
  clearGatewayType: () => void;
}

export const useFuelExtension = (): WagmiGateway | FuelGateway => {
  const { gatewayType, setGatewayType, clearGatewayType } = useGatewayStore();
  const { fuel } = useFuel();
  const [wagmi] = useState(() => new WagmiProvider());

  
  return useMemo(() => {
    const baseObject = {
      setGatewayType,
      clearGatewayType,
    }

    switch (gatewayType) {
      case FUEL_TYPE.WAGMI_METAMASK:
      case FUEL_TYPE.WAGMI_COINBASE:
      case FUEL_TYPE.WAGMI_WALLETCONNECT:
      case FUEL_TYPE.LIT_GOOGLE_AUTH:
      case FUEL_TYPE.LIT_DISCORD_AUTH:
        return {
          ...baseObject,
          wagmiGateway: wagmi,
          fuelGateway: undefined,
        }
      case FUEL_TYPE.FUEL:
      case FUEL_TYPE.FUELET:
      default:
        return {
          ...baseObject,
          fuelGateway: fuel,
          wagmiGateway: undefined,
        };
    }
  }, [gatewayType, setGatewayType, clearGatewayType]);
};
