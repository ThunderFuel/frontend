import { ThunderURL } from "../index";

export default {
  getData() {
    return ThunderURL.get("/v1/etherscan");
  },
};
