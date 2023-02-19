/// <reference types="react-scripts" />

import { FuelWeb3 } from "@fuel-wallet/sdk";

export {};

declare global {
  interface Window {
    fuel: FuelWeb3;
    requestParams: any;
  }
}
