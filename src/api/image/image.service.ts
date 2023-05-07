import { ThunderURL } from "../index";

export default {
  getToken: (params: { fileName: string; directoryName: string }) => {
    return ThunderURL.get("v1/auth/generatesasuri", { params });
  },
};
