import { useLocalStorage } from "./useLocalStorage";

const LocalStorageAuthToken = "thunder_auth_token";

export const getAuthTokenFromLocalStorage = () => {
  return useLocalStorage().getItem(LocalStorageAuthToken);
};
export const setAuthTokenFromLocalStorage = (data: any) => {
  return useLocalStorage().setItem(LocalStorageAuthToken, data);
};

export const clearAuthTokenFromLocalStorage = () => {
  return useLocalStorage().removeItem(LocalStorageAuthToken);
};

export default {
  getAuthTokenFromLocalStorage,
  setAuthTokenFromLocalStorage,
  clearAuthTokenFromLocalStorage,
};
