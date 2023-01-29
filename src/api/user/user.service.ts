import { ThunderURL } from "../index";
import { ICreateUser, IUserResponse } from "./user.type";
import { ApiResponse } from "../HttpClient";

export default {
  getUser(params: any): Promise<ApiResponse<IUserResponse>> {
    return ThunderURL.get("v1/user", { params });
  },
  createUser(body: ICreateUser) {
    return ThunderURL.post("v1/user", body);
  },
};
