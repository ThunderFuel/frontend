import { AssetMockNFT } from "../assets";

export default {
  getSearchResult: () => {
    return {
      collections: [
        { id: "1", name: "Bored Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
        { id: "2", name: "Ape Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
        { id: "3", name: "Mutant Ape Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
        { id: "4", name: "Thunder Club", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
        { id: "5", name: "Fuel Labs Gang", image: AssetMockNFT, itemCount: "10.000 ITEMS" },
      ],
      accounts: [
        { id: "9", name: "ApeR", image: AssetMockNFT },
        { id: "10", name: "Ape4Life", image: AssetMockNFT },
        { id: "11", name: "ApeDad", image: AssetMockNFT },
        { id: "12", name: "0xNFT", image: AssetMockNFT },
        { id: "13", name: "0xtrayder", image: AssetMockNFT },
      ],
    };
  },
};
