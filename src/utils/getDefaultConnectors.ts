import {
  type BurnerWalletConfig,
  BakoSafeConnector,
  BurnerWalletConnector,
  FuelWalletDevelopmentConnector,
  FuelWalletConnector,
  FueletWalletConnector,
  WalletConnectConnector,
} from "@fuels/connectors";
import type { Config } from "@wagmi/core";
import type { Provider } from "fuels";

interface IDefaultConnectors {
  wcProjectId: string;
  ethWagmiConfig: Config;
  chainId: number;
  fuelProvider: Promise<Provider>;
  burnerWalletConfig?: BurnerWalletConfig;
}

export const getDefaultConnectors = ({ wcProjectId, ethWagmiConfig, chainId, fuelProvider, burnerWalletConfig }: IDefaultConnectors) => {
  const connectors = [
    new FuelWalletConnector(),
    new BakoSafeConnector(),
    new FueletWalletConnector(),
    new WalletConnectConnector({
      projectId: wcProjectId,
      wagmiConfig: ethWagmiConfig,
      chainId,
      fuelProvider,
    }),
    new BurnerWalletConnector({
      ...burnerWalletConfig,
      chainId,
      fuelProvider,
    }),
  ];

  if (process.env.NODE_ENV === "development") {
    connectors.push(new FuelWalletDevelopmentConnector());
  }

  return connectors;
};
