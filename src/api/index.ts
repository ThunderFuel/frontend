import HttpClient from "./HttpClient";
import { Provider } from "fuels";
import config from "config";

export const ThunderURL = new HttpClient(config.getConfig("baseURL"));
export const FuelProvider = new Provider("https://beta-3.fuel.network/graphql");
