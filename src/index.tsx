import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router/Router";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LOCALES from "./locales";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/browser";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { createClient, reservoirChains } from "@reservoir0x/reservoir-sdk";
import { goerli, linea, mainnet } from "wagmi/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains([linea, goerli, mainnet], [publicProvider()]);

export const connectors = [
  new MetaMaskConnector({ chains }),
  // new CoinbaseWalletConnector({
  //   chains,
  //   options: {
  //     appName: "wagmi",
  //   },
  // }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: "fbbe076e89456ef4f6f54493682058b9",
    },
  }),
];

const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient,
});

createClient({
  chains: [
    { ...reservoirChains.linea, active: true },
    { ...reservoirChains.goerli, active: true },
  ],
  apiKey: "151eda75-a312-5fcd-bfac-cf3ea796cb28",
  source: "thundernft.market",
  marketplaceFees: [`0x313A0A2338999cf88F3F7FF935fe9D9128FFB074:200`],
});

i18next.use(initReactI18next).init({
  resources: LOCALES,
  lng: "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

Sentry.init({
  dsn: "https://88f305bbb3ef4cfe956e009220f8d481@o4504775680196608.ingest.sentry.io/4504775682293760",
  integrations: [
    new BrowserTracing(),
    new Sentry.Integrations.Breadcrumbs({
      console: false,
    }),
  ],
  tracesSampleRate: 1.0,
  ignoreErrors: [/^Cannot read properties of undefined (reading 'isConnected')$/],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={config}>
        <Router />
      </WagmiConfig>
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
