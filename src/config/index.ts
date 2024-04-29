import fuel from "./fuel.thundernft.market.json";
import base from "./thundernft.market.json";

// const FUEL_URL = "fuel.thundernft.market";
// const WAGMI_URL = "thundernft.market";

const FUEL_URL = "thundernft.market";
const WAGMI_URL = "";

enum PATH_TYPE {
  ID,
  SLUG,
}

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

  getConfig(fieldName = "") {
    return this.config[fieldName] ?? "";
  }

  isCollectionPathSlug() {
    return this.getConfig("collectionPathType") === PATH_TYPE.SLUG;
  }

  isHideAllCancelButtons() {
    return !!this.getConfig("hideAllCancelButtons");
  }
}

export default new Config();
