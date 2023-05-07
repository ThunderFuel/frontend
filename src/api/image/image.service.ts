import { ThunderURL } from "../index";

export default {
  getToken: (params: { ext: any }) => {
    return ThunderURL.get("v1/auth/generatesasuri", { params });
  },
};
