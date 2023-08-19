/// <reference types="react-scripts" />

import { FuelWeb3 } from "@fuel-wallet/sdk";

export {};

declare global {
  interface Window {
    fuel: FuelWeb3;
    fuelet: FuelWeb3;
    ethereum: any;
    requestParams: any;
  }
}
