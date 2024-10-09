import { localStore } from "./useLocalStorage";

const LocalStorageAuthToken = "thunder_auth_token";

export const getAuthTokenFromLocalStorage = () => {
  return localStore.getItem(LocalStorageAuthToken);
};
export const setAuthTokenFromLocalStorage = (data: any) => {
  return localStore.setItem(LocalStorageAuthToken, data);
};

export const clearAuthTokenFromLocalStorage = () => {
  return localStore.removeItem(LocalStorageAuthToken);
};

export default {
  getAuthTokenFromLocalStorage,
  setAuthTokenFromLocalStorage,
  clearAuthTokenFromLocalStorage,
};
