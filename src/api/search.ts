import { ThunderURL } from "./index";

export default {
  getSearchResult: async (searchTerm: string) => {
    return ThunderURL.get("v1/collection/search", { params: { q: searchTerm } });
  },
};
