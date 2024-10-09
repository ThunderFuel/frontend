/// <reference types="react-scripts" />

import type { Fuel } from "fuels";

export {};

declare global {
  interface Window {
    fuel: Fuel;
    fuelet: Fuel;
    ethereum: any;
    requestParams: any;
  }
}
