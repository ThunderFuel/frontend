import { AssetDropTest } from "assets";
import { SocialTypes } from "../collections/collections.type";

export enum BLOCK_TYPE {
  Infinity,
  ImageText,
  SingleImage,
  VideoText,
  SingleVideo,
}

const dropPrimary = {
  className: "drop-primary",
  banner: AssetDropTest.DropPrimary.Banner,
  title: "The Poser Party",
  about:
    "Time for an experiment...\n" +
    "What is real and what is fake? Rich bros doing groceries in a Lambo, Instababes photoshopping themselves a new a-hole or two and bulky guys looking like Thor by only eating testicle sashimi (100% natty bro). Things are getting blurry, daddy.\n" +
    "While real people act fake online, why not create fictional people who become the realest? What if we create imaginary characters who would be total misfits in real life and grow them into the biggest superstars?\n" +
    "They’re cringy. They’re dorky. They’re f*cking hilarious. Traphouse George, Steroid Ron and New Age Jimmy are here to become world-famous superstar DJs.\n" +
    "Invest in, curate and co-decide your favorite artist's career. Watch your NFT come to life, own a piece of their brand and become part of their road to stardom. Your artists are brought to life through various forms of entertainment: music, animations, performances & much more.\n" +
    "In collaboration with Warner Records, Probably A Label and OpenSea. Design by John F. Malta (Netflix, Facebook, COMPLEX, New York Times).\n" +
    "Posers are real.",
  blocks: [
    {
      type: BLOCK_TYPE.Infinity,
      images: [
        [
          AssetDropTest.DropPrimary.Infinity.infinity322,
          AssetDropTest.DropPrimary.Infinity.infinity323,
          AssetDropTest.DropPrimary.Infinity.infinity324,
          AssetDropTest.DropPrimary.Infinity.infinity328,
          AssetDropTest.DropPrimary.Infinity.infinity329,
          AssetDropTest.DropPrimary.Infinity.infinity3210,
        ],
        [
          AssetDropTest.DropPrimary.Infinity.infinity3212,
          AssetDropTest.DropPrimary.Infinity.infinity3213,
          AssetDropTest.DropPrimary.Infinity.infinity3214,
          AssetDropTest.DropPrimary.Infinity.infinity3215,
          AssetDropTest.DropPrimary.Infinity.infinity3216,
        ],
      ],
    },
    {
      type: BLOCK_TYPE.ImageText,
      image: AssetDropTest.DropPrimary.ImageText,
      title: "Welcome to the Party!",
      text:
        "The Poser Party is an entertainment & music studio. We’re starting off by launching three virtual (soon to be) superstar DJs. Born in a digital identity, equipped to rock the digital world & the physical world.\n" +
        "The Poser Party is a parody on stereotypes drawn from modern day pop culture: Gym culture, Street culture & Spiritual culture. By building strong personal brands around our artists, we’re paving the way for brand partnerships within their specific subcultures, as well as with music brands.\n" +
        "Steroid Ron, Traphouse George & New Age Jimmy are unique characters, brought to life through hilarious storylines in the form of:\n" +
        "Hilarious animated videos & cartoons\n" +
        "Monthly releases of the hottest dance music\n" +
        "Live (DJ) performances\n" +
        "Digital performances\n" +
        "Music videos\n" +
        "Social media presence\n" +
        "Merchandise\n" +
        "Special surprises",
    },
    {
      type: BLOCK_TYPE.SingleImage,
      image: AssetDropTest.DropPrimary.SingleImage,
    },
    {
      type: BLOCK_TYPE.ImageText,
      image: AssetDropTest.DropPrimary.ImageText01,
      title: "Utility",
      text:
        "Exclusive access to The Poser Party’s token-gated communities; The Party, Ron’s Gym, Jimmy’s Commune and George’s Traphouse\n" +
        "Curate & co-decide our artists careers by voting on creative proposals, music, and governance over the DAO treasuries.\n" +
        "Join a gamified competition between the 3 virtual artists to join them in their road to stardom.\n" +
        "Ability to submit creative and business proposals to be voted on by team and community.\n" +
        "Access to all future token gated digital shows and metaverse events.\n" +
        "Allowlist for all future digital collectible drops. Exclusive access to physical merch, live events & surprise airdrops (e.g. music NFTs, art upgrades & more) .",
      reverse: true,
    },
  ],
  team: [
    {
      image: AssetDropTest.DropPrimary.Team.richie,
      name: "Richie",
      label: "CO-FOUNDER",
      text: "Working as a high level business coach taught Richie (35) the psychology behind human influence. Combined with his experience as a touring MC, creative writing and storytelling, Richie is responsible for the creative concepting and branding behind The Poser Party. Richie, weirdly enough, also graduated a Masters in Law.",
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
    {
      image: AssetDropTest.DropPrimary.Team.many,
      name: "Manny",
      label: "CO-FOUNDER",
      text: "Manny (33) has had management level marketing experience from large corporations and the biggest dance record label; Spinnin’ Records. With over a decade of business experience from his technology master’s degree, Izzy provides the Poser Party strategic market vision for The Poser Party.",
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
    {
      image: AssetDropTest.DropPrimary.Team.subgroover,
      name: "Subgroover",
      label: "Multi Platinum Producer",
      text: "Subgroover has worked with the biggest names in the Music Industry, such as Tiesto, Steve Aoki, KSHMR and many more. Subgroover is a solid part of The Poser Party music team.",
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
    {
      image: AssetDropTest.DropPrimary.Team.john,
      name: "John F. Malta",
      label: "Art Director & Illustrator",
      text: "John F. Malta is a praised art director, illustrator and animator. During his career he has worked with various top-level brands as Netflix, Facebook, COMPLEX, Liquid Death, Dr. Martens and many more. He also has publications in the The New York Times, The New Yorker & The Wall Street Journal.",
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
  ],
  faq: [],
  allowListPhase: [
    {
      startDate: 1687117656000,
      endDate: 1687344293000,
      available: 1000,
      price: 0.12312312,
      walletCount: 2,
      taken: 555,
    },
  ],
};
const dropSecondary = {
  className: "drop-secondary",
  banner: AssetDropTest.DropSecondary.Banner,
  title: "EVERYBODYS",
  about:
    "Everybodys are 10,000 original characters by artist Sean Solomon. Eventually, Everybodys will be animations, physical products, stories and more. In fact, Everybodys are planning to take over the world (in a fun way). These characters will start as static profile pictures, but they are designed with animation in mind. Every animation you see on this page is fully modular, with interchangeable traits. This means holders have the potential to see their characters skate, jump, wave, and maybe even fall in love...\n" +
    "Everybodys are cute, simple, unique and diverse. Each PFP is cropped from a full body character created directly in animation software, assembled from over 260 colorful traits. The collection also includes mysterious Nobodys and rare Somebodys. Everybodys is built around a style guide, rather than specific lore, meaning there's no limit to the worlds they can inhabit. Everybodys will go everywhere and do everything.",
  blocks: [
    {
      type: BLOCK_TYPE.Infinity,
      images: [
        AssetDropTest.DropSecondary.Infinity.infinity01,
        AssetDropTest.DropSecondary.Infinity.infinity02,
        AssetDropTest.DropSecondary.Infinity.infinity03,
        AssetDropTest.DropSecondary.Infinity.infinity04,
        AssetDropTest.DropSecondary.Infinity.infinity05,
        AssetDropTest.DropSecondary.Infinity.infinity06,
        AssetDropTest.DropSecondary.Infinity.infinity07,
        AssetDropTest.DropSecondary.Infinity.infinity08,
        AssetDropTest.DropSecondary.Infinity.infinity09,
        AssetDropTest.DropSecondary.Infinity.infinity10,
        AssetDropTest.DropSecondary.Infinity.infinity11,
        AssetDropTest.DropSecondary.Infinity.infinity12,
      ],
    },
    {
      type: BLOCK_TYPE.SingleImage,
      image: AssetDropTest.DropSecondary.SingleImage,
    },
    {
      type: BLOCK_TYPE.ImageText,
      image: AssetDropTest.DropSecondary.ImageText,
      title: "The Artist",
      text: 'Sean Solomon is an artist, animator, and writer. Sean has been refining his iconic visual style for more than a decade, creating work for television, music videos, gallery shows, and more. As an animator, he has worked for clients like Nike, Adidas, HBO, and Adult Swim. You may recognize his work from music videos for artists like Unknown Mortal Orchestra and Run the Jewels, or Fox\'s "Lucas Bros Moving Co," which he art directed. Sean is currently developing his own pilot for HBO Max. He also runs a successful clothing company called Die 9 Times. If you haven’t heard of Sean Solomon, you’ve probably seen his art shared online, bootlegged, or tattooed to someone’s arm.',
      reverse: true,
    },
    {
      type: BLOCK_TYPE.VideoText,
      image: AssetDropTest.DropSecondary.VideText,
      title: "The Team",
      video: "/video.mp4",
      text: "Everybodys was co-founded by artist Sean Solomon and project manager David Schaefer, a writer and NFT enthusiast who joined the space in February 2021. David became a fan of Sean's work after attending an art show of Sean's when David was just 13. The two later went on to become friends through the LA music scene. The rest of the team was built similarly, with childhood friends and exciting new ones. The Everybodys team brings a perspective informed by years of experience making art, writing stories, and building communities. Whether in visual art, music, TV, or web 3, Solomon and Schaefer have always valued creative collaboration above all else.",
    },
  ],
  team: [
    {
      image: AssetDropTest.DropSecondary.Team.SeanSolomon,
      name: "Sean Solomon",
      label: "CO-FOUNDER",
      text: "Sean Solomon is an artist, animator, and writer from Los Angeles, California. As an animator, Sean has made commercial work for clients like Nike, Adidas, HBO, and Adult Swim. Sean art directed Lucas Bros Moving Co for Fox when he was just 21 years old, and is currently developing a pilot of his own for HBO Max. Sean runs a successful clothing company called Die 9 Times, and his band, Moaning, has released 2 albums on Sub Pop Records. Sean has art directed a number of events, from his own gallery shows to the 2017 Sonora stage at Coachella.",
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
    {
      image: AssetDropTest.DropSecondary.Team.DavidSchaefer,
      name: "David Schaefer",
      label: "CO-FOUNDER",
      text: 'David Schaefer is the co-founder and project manager of Everybodys. Schaefer handles all marketing, partnerships, and social media for Everybodys. He is a musician, event organizer, and writer, and has been in the NFT space since February 2021. As a musician, he has recorded 3 full length albums, and collaborated with artists like Phoebe Bridgers. His band, Okay Embrace, was featured by Spotify Editorial as a "Fresh Find," and reached top 50 on the NACC charts. As a writer, he has experience across mediums, including working in the writers room for an unreleased MGM pilot called "All Good Things."',
      socialMedias: [
        {
          type: SocialTypes.Twitter,
          address: "",
        },
        {
          type: SocialTypes.Telegram,
          address: "",
        },
        {
          type: SocialTypes.Website,
          address: "",
        },
      ],
    },
  ],
  roadmap: [
    {
      title: "Attract top-tier talent",
      text: "We've entered a partnership with the Neese Brothers, Co-Executive Producers of the #1 Netflix Series, Umbrella Academy. Through their collaboration, we are aiming to bring the Everbodys brand to TV with their creative direction. Web3 collaborations with Fusionara, Suptho, and Tribe are allowing us to create a foundation for growth in all directions of web3. Our mission is to become a household name.",
      image: AssetDropTest.DropSecondary.Roadmap.Roadmap01,
      checked: true,
    },
    {
      title: "Develop a community-driven storytelling environment",
      text: "Holders can help shape the story of the characters that will be featured in the animated series. Throughout the creation of the show, we encourage holders to join the conversations we host with the Neese Brothers and the team. With open dialogue, we will build a world by and for the community. Capturing the essence of Web3.",
      image: AssetDropTest.DropSecondary.Roadmap.Roadmap02,
    },
    {
      title: "Community Growth and Experiences",
      text: "Everbodys combines the best of digital blockchain-loving and physical life: from Twitter to Discord to parties hosted by Founder & DJ of 18 years, Jamieson Hill. As the project expands, we provide a foundation for others to grow with us in the space, launching Web3 jobs for as many as possible. Our partnership with Thunder Marketplace will help us continue to deliver on our goals.",
      image: AssetDropTest.DropSecondary.Roadmap.Roadmap03,
    },
  ],
  faq: [
    {
      title: "When is the mint date?",
      text: "When is the mint date?",
    },
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
      startDate: 1684584312000,
      endDate: 1687344293000,
      available: 1000,
      price: 0.12312312,
      walletCount: 2,
      taken: 555,
    },
  ],
};

export default {
  getDropPrimary: (dropId: any = 1) => {
    const response = Number(dropId) === 1 ? dropPrimary : dropSecondary;

    return Promise.resolve(response);
  },
};
