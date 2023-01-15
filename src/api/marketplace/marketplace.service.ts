import { ThunderURL } from "../index";
import { AssetTable1Image, AssetTableImageNft1 } from "assets";
import { MarketplacePaginationResponse } from "./marketplace.type";

export default {
  getMarketplace() {
    return [
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        change: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        change: -123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
      {
        collection: "CryptoPunks",
        volume: 123.21,
        floor: 123.21,
        image: AssetTable1Image,
        lastSold: "",
        images: [AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1, AssetTableImageNft1],
        sales: 1,
      },
    ];
  },
  async getMarketplace1(params: any = {}) {
    return ThunderURL.get<MarketplacePaginationResponse>("v1/collection", { params });
  },
};
