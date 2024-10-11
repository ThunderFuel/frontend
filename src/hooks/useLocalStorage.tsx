// Keep as many objects out of react state as possible
// Otherwise objects will be re-rendered on every state change/new render
export const localStore = {
  setItem: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: (key: string) => {
    try {
      const data = localStorage.getItem(key);

      return JSON.parse(data as string);
    } catch {
      return null;
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const useLocalStorage = () => {
  return localStore;
};
