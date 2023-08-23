import fuel from "./fuel.thundernft.market.json";
import base from "./thundernft.market.json";

class Config {
  config: { [key: string]: any } = {};

  constructor() {
    const hostname = window.location.hostname;
    if (hostname === "thundernft.market") {
      this.config = base;
    } else if (hostname === "fuel.thundernft.market") {
      this.config = fuel;
    }
    this.config = {};
  }

  getConfig(name = "") {
    return this.config[name] ?? "";
  }
}

export default new Config();
