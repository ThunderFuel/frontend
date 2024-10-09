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
import { Fuel } from 'fuels';
import { FuelProvider } from "@fuels/react";

import { FuelWalletConnector, FueletWalletConnector } from "@fuels/connectors";
import { BrowserTracing } from "@sentry/browser";

export const FuelInstance = new Fuel({
  connectors: [new FueletWalletConnector(), new FuelWalletConnector()],
});


// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { createClient, reservoirChains } from "@reservoir0x/reservoir-sdk";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import { FUEL_NETWORKS, FUEL_CONFIG, WAGMI_CONFIG, QUERY_CLIENT } from "global-constants";
import {  QueryClientProvider } from "@tanstack/react-query";
import ModalLogin from "./modal-login";
import { WagmiProvider } from 'wagmi';

const isDevelopment = "development" === process.env.NODE_ENV;

export const litNodeClient = new LitNodeClient({
  litNetwork: "cayenne",
  debug: false,
});

// litNodeClient.connect();

createClient({
  chains: [
    { ...reservoirChains.linea, active: true },
    { ...reservoirChains.goerli, active: true },
  ],
  apiKey: "151eda75-a312-5fcd-bfac-cf3ea796cb28",
  source: "thundernft.market",
  marketplaceFees: ['0x313A0A2338999cf88F3F7FF935fe9D9128FFB074:200'],
});

i18next.use(initReactI18next).init({
  resources: LOCALES,
  lng: "tr",
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

if (!isDevelopment) {
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
}

const stytch = new StytchUIClient("public-token-test-af22c4d3-1e8a-4fa5-a0fa-4c032e2a840a");


// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StytchProvider stytch={stytch}>
        <WagmiProvider config={WAGMI_CONFIG}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <FuelProvider
            theme="dark"
            fuelConfig={FUEL_CONFIG}
            networks={FUEL_NETWORKS}
          >
            <Router />
          </FuelProvider>
        </QueryClientProvider>
        </WagmiProvider>
      </StytchProvider>
    </Provider>
    <ToastContainer />
    <ModalLogin />
  </React.StrictMode>,
  document.getElementById("root")
);
