import fuel from "./fuel.thundernft.market.json";
import base from "./thundernft.market.json";

const FUEL_URL = "fuel.thundernft.market";
const WAGMI_URL = "thundernft.market";

class Config {
  config: { [key: string]: any } = {};

  constructor() {
    const hostname = window.location.hostname;
    this.config = fuel;
    if (hostname === WAGMI_URL) {
      this.config = base;
    } else if (hostname === FUEL_URL) {
      this.config = fuel;
    }
  }

  getConfig(name = "") {
    return this.config[name] ?? "";
  }
}

export default new Config();
