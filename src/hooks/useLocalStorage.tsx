export const useLocalStorage = () => {
  return {
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
};
