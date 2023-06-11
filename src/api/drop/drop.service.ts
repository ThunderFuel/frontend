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
        type: BLOCK_TYPE.SingleImage,
        image: AssetDropThunder.SingleImage,
      },
    ],
    team: [
      {
        image: "https://picsum.photos/600",
        name: "Sean Solomon",
        label: "CO-FOUNDER",
        text: "Sean Solomon is an artist, animator, and writer from Los Angeles, California. As an animator, Sean has made commercial work for clients like Nike, Adidas, HBO, and Adult Swim. Sean art directed Lucas Bros Moving Co for Fox when he was just 21 years old, and is currently developing a pilot of his own for HBO Max. Sean runs a successful clothing company called Die 9 Times, and his band, Moaning, has released 2 albums on Sub Pop Records. Sean has art directed a number of events, from his own gallery shows to the 2017 Sonora stage at Coachella.",
        socialMedias: [],
      },
      {
        image: "https://picsum.photos/600",
        name: "David Schaefer",
        label: "CO-FOUNDER",
        text: "David Schaefer is the co-founder and project manager of Everybodys. Schaefer handles all marketing, partnerships, and social media for Everybodys. He is a musician, event organizer, and writer, and has been in the NFT space since February 2021. As a musician, he has recorded 3 full length albums, and collaborated with artists like Phoebe Bridgers. His band, Okay Embrace, was featured by Spotify Editorial as a 'Fresh Find,' and reached top 50 on the NACC charts. As a writer, he has experience across mediums, including working in the writers room for an unreleased MGM pilot called 'All Good Things.'",
        socialMedias: [],
      },
    ],
    roadMap: [
      {
        image: "https://picsum.photos/600",
        title: "Attract top-tier talent",
        text: "We've entered a partnership with the Neese Brothers, Co-Executive Producers of the #1 Netflix Series, Umbrella Academy. Through their collaboration, we are aiming to bring the Everbodys brand to TV with their creative direction. Web3 collaborations with Fusionara, Suptho, and Tribe are allowing us to create a foundation for growth in all directions of web3. Our mission is to become a household name.",
        checked: true,
      },
      {
        image: "https://picsum.photos/600",
        title: "Develop a community-driven storytelling environment",
        text: "Holders can help shape the story of the characters that will be featured in the animated series. Throughout the creation of the show, we encourage holders to join the conversations we host with the Neese Brothers and the team. With open dialogue, we will build a world by and for the community. Capturing the essence of Web3.",
        checked: false,
      },
      {
        image: "https://picsum.photos/600",
        title: "Community Growth and Experiences",
        text: "Everbodys combines the best of digital blockchain-loving and physical life: from Twitter to Discord to parties hosted by Founder & DJ of 18 years, Jamieson Hill. As the project expands, we provide a foundation for others to grow with us in the space, launching Web3 jobs for as many as possible. Our partnership with Thunder Marketplace will help us continue to deliver on our goals.",
        checked: false,
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
        startDate: 1685740306,
        endDate: 1685913106,
        available: 0,
        price: 0.0,
        walletCount: 0,
        taken: 0,
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
