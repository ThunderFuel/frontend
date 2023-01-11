import HttpClient from "./HttpClient";

export const ExampleBFF = new HttpClient("example.com");
export const ThunderURL = new HttpClient(process.env.REACT_APP_API_URL as string);
