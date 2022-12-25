import { AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4 } from "../assets";

const images = [AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4];

export default {
  async getCollections() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((item) => ({
      collection: `Genuine Undead #${item}`,
      image: images[item],
      price: 1.43,
      lastSale: 0.88,
      owner: "Apedad23",
      timeListed: "2 hours ago",
    }));
  },
};
