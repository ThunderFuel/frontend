import { ThunderURL } from "../index";
import { AssetDropThunder } from "assets";

export enum BLOCK_TYPE {
  Infinity,
  ImageText,
  SingleImage,
  VideoText,
  SingleVideo,
}

export enum DROP_STATUS {
  MINT_LIVE,
  MINT_SOON,
  MINT_OUT,
}

const THUNDER_ID = "thunder";
const responseThunder = {
  data: {
    id: 6,
    walletAddress: "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307",
    className: "drop-thunder",
    banner: AssetDropThunder.Banner,
    title: "Open Beta Testers",
    about:
      "We are excited to announce the launch of Thunder Marketplace OPEN BETA!\n" +
      "\n" +
      "As a token of our gratitude, we introduce the Open Beta Tester ID NFT Collection reflecting the spirit of our marketplace: innovation, creativity and community. By minting NFTs on our testnet, you will allow us to fully explore the possibilities of our marketplace and to perfect our systems before we go live.\n" +
      "\n" +
      "Each participant will receive a unique, individually minted NFT. This NFT will serve as a permanent reminder of your involvement in our marketplace, acting as a kind of digital badge of honor. And you should be ready to show this badge if any opportunity comes knocking at your door in the future.\n" +
      "\n" +
      "By participating in our open beta in this new era of digital art and collectibles, you are taking part in shaping the story of our superior NFT experience. Thank you for being a part of our journey and welcome to the exclusive club of Open Beta Testers.\n" +
      "\n" +
      "Let's create, innovate, and inspire together!",
    blocks: [
      {
        type: BLOCK_TYPE.SingleVideo,
        image: AssetDropThunder.SingleVideoBg,
        video: "https://thassetstorage.blob.core.windows.net/assets/thunder-video.mp4",
      },
    ],
    faq: [
      { title: "When is the mint date?", text: "When is the mint date?" },
      {
        title: "What is the mint price?",
        text: "What is the mint price?",
      },
      {
        title: "How do I get on the Allowlist?",
        text: "How do I get on the Allowlist?",
      },
      {
        title: "Do I pay gas fees when minting?",
        text: "Yes, gas fees occur for any transaction or attempted transaction on the Ethereum blockchain, including a mint. The amount varies depending on a variety of factors including how many people are using the network at that specific moment. OpenSea does not control gas prices, nor does it receive or profit from them, and OpenSea is not able to refund gas fees. You'll pay gas fees even if you weren't able to successfully mint.",
      },
    ],
    allowListPhase: [
      {
        title: "Public Mint",
        startDate: 1685740306,
        endDate: 1685913106,
        available: 8888,
        price: 0,
        walletCount: 1,
        taken: 1,
      },
    ],
    socialMedias: [],
    creator: {
      name: "Thunder",
      image: "https://cdn.thundernft.market/assets/drop/f330f6a4-37a8-4d28-9af2-5953fff928f1.png",
    },
  },
  hasError: false,
  message: null,
};

export default {
  getDropDetail: (dropId: any = 1) => {
    if (dropId === THUNDER_ID) {
      return Promise.resolve(responseThunder);
    }

    return ThunderURL.get<any>(`v1/drop/detail?id=${dropId}`);
  },
  getDrops: (params: any) => {
    return ThunderURL.get<any[]>("v1/drop/drops", { params });
  },
};
