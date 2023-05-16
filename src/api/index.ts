import HttpClient from "./HttpClient";

export const ThunderURL = new HttpClient(process.env.REACT_APP_API_URL as string);
export const EtherscanURL = new HttpClient("https://api.etherscan.io/");
