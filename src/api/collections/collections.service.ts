import { ThunderURL } from "../index";
import { AssetCollectionItem0, AssetCollectionItem1, AssetCollectionItem2, AssetCollectionItem3, AssetCollectionItem4 } from "../../assets";
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
  async getFilters<CollectionFilterResponse>() {
    return await ThunderURL.get<CollectionFilterResponse>("v1/collection/getfilters?id=1");
  },
  async getActivity() {
    return [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4].map((item) => ({
      id: item,
      name: `Genuine Undead #${item}`,
      description: "Bid placed by 409x792 to you, 1 mins ago",
      image: images[item],
      price: 1.43,
      type: item % 4 !== 0,
    }));
  },
};
