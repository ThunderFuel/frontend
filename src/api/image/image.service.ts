import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";

export default {
  getToken: (params: { ext: any; directoryName: any }): Promise<ApiResponse<any>> => {
    return ThunderURL.get("v1/auth/generatesasuri", { params });
  },
};
