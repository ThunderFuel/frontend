import { coinbaseWallet, metaMask, walletConnect } from "@wagmi/connectors";
import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { WALLET_CONNECT_PROJECT_ID } from "global-constants";

export const WagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: WALLET_CONNECT_PROJECT_ID,
    }),
    coinbaseWallet({
      appName: "Thunder",
      appLogoUrl: "https://thundernft.market/favicon.png",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
