export const useLocalStorage = () => {
  return {
    setItem: (name: string, data: any) => {
      localStorage.setItem(name, JSON.stringify(data));
    },
    getItem: (name: string) => {
      try {
        const data = localStorage.getItem(name);

        return JSON.parse(data as string);
      } catch {
        return null;
      }
    },
  };
};

export const getAuthTokenFromLocalStorage = () => {
  return useLocalStorage().getItem("auth_token");
};
