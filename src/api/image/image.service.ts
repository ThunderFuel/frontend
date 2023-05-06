import { ThunderURL } from "../index";

export default {
  getToken: () => {
    return ThunderURL.get("v1/auth/generatesasuri");
  },
};
