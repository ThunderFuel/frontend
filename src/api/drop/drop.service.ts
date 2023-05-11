import { AssetDropTest } from "assets";

enum BLOCK_TYPE {
  Infinity,
  ImageText,
  SingleImage,
  VideoText,
  SingleVideo,
}

export default {
  getDropTest01: () => {
    return {
      banner: AssetDropTest.Test01.Banner,
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
            AssetDropTest.Test01.Infinity.infinity322,
            AssetDropTest.Test01.Infinity.infinity323,
            AssetDropTest.Test01.Infinity.infinity324,
            AssetDropTest.Test01.Infinity.infinity328,
            AssetDropTest.Test01.Infinity.infinity329,
            AssetDropTest.Test01.Infinity.infinity3210,
            AssetDropTest.Test01.Infinity.infinity3212,
            AssetDropTest.Test01.Infinity.infinity3213,
            AssetDropTest.Test01.Infinity.infinity3214,
            AssetDropTest.Test01.Infinity.infinity3215,
            AssetDropTest.Test01.Infinity.infinity3216,
          ],
        },
        {
          type: BLOCK_TYPE.ImageText,
          image: AssetDropTest.Test01.ImageText,
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
          image: AssetDropTest.Test01.SingleImage,
        },
        {
          type: BLOCK_TYPE.ImageText,
          image: AssetDropTest.Test01.ImageText01,
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
        {
          type: BLOCK_TYPE.ImageText,
          image: AssetDropTest.Test01.ImageText01,
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
          name: "Richie",
          label: "CO-FOUNDER",
          text: "Working as a high level business coach taught Richie (35) the psychology behind human influence. Combined with his experience as a touring MC, creative writing and storytelling, Richie is responsible for the creative concepting and branding behind The Poser Party. Richie, weirdly enough, also graduated a Masters in Law.",
        },
      ],
    };
  },
};
