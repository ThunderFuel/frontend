import { useTabContext } from "./useTabContext";

export const useTab = () => {
  const { activeTab } = useTabContext();

  return { activeTab };
};
