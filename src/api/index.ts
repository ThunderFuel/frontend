import HttpClient from "./HttpClient";
// import { Provider } from "fuels";

export const ThunderURL = new HttpClient(process.env.REACT_APP_API_URL as string);
// export const FuelProvider = new Provider("https://beta-4.fuel.network/graphql");
