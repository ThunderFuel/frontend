import { AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4 } from "../assets";

const images = [AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4];

export default {
  async getCollections() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((item) => ({
      id: item,
      collection: `Genuine Undead #${item}`,
      name: `Genuine Undead #${item}`,
      image: images[item],
      price: 1.43,
      floor: 1.43,
      lastSale: 0.88,
      owner: "Apedad23",
      timeListed: "2 hours ago",
      isActive: item % 4 !== 0,
    }));
  },
};
