import { ThunderURL } from "../index";
import { ApiResponse } from "../HttpClient";

export default {
  async generatetoken(params = {}): Promise<ApiResponse<any>> {
    return ThunderURL.get("v1/auth/generatetoken", { params });
  },
};
