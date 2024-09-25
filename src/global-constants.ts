export const THUNDER_THEME_NAME = "thunder_theme";
export const WALLET_CONNECT_PROJECT_ID = "fbbe076e89456ef4f6f54493682058b9";

export const provider = "https://testnet.fuel.network/v1/graphql";
export const FUEL_FAUCET_URL = "https://faucet-testnet.fuel.network/";
export const FUEL_EXPLORER_URL = "https://next-app.fuel.network/";

export const poolContractId = "0x6e7b503001d4f3ad0cb957d0201263c674e4cc744cece5cca587beec8422662e";
export const executionManagerContractId = "0x4cc76daec9f3a8fe36b55d2b5f841f15e14d719094e73f25f26476e5a95e406d";
export const royaltyManagerContractId = "0x125df60f18c9c86b025cb4015b2c1375cda45cf405762cccae1955ce274ca3ba";
export const assetManagerContractId = "0xa6bb9d650a74f3c8ac0f6fdb0d97eefce5579fdd94891b9584559e23916c03ea";
export const strategyFixedPriceContractId = "0xcb7ffc0631242f4804df59aded3cd6374aee8c0f7cec6f1d584110c06cbb5569";
export const strategyAuctionContractId = "0x9ffe3ca6b3e042b57527e078dbabfefcfb84708251d9ce2cf20220b564bda4a4";
export const exchangeContractId = "0x5f1c2c8f0c3f2e34a36f55ae4b80e594b81b33c8a41cfdf450d35bf51211ccc5";
export const ERC721ContractId = "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74";

// StrategyAuction contract id: 0x9b68a29813a329fa9c4d270a7c19081e369d332075ebb357a9fcb40824d88654

export const contracts = {
  pool: "0x6e7b503001d4f3ad0cb957d0201263c674e4cc744cece5cca587beec8422662e",
  executionManager: "0x4cc76daec9f3a8fe36b55d2b5f841f15e14d719094e73f25f26476e5a95e406d",
  royaltyManager: "0x125df60f18c9c86b025cb4015b2c1375cda45cf405762cccae1955ce274ca3ba",
  assetManager: "0xa6bb9d650a74f3c8ac0f6fdb0d97eefce5579fdd94891b9584559e23916c03ea",
  strategyFixedPrice: "0xcb7ffc0631242f4804df59aded3cd6374aee8c0f7cec6f1d584110c06cbb5569",
  strategyAuction: "0x9ffe3ca6b3e042b57527e078dbabfefcfb84708251d9ce2cf20220b564bda4a4",
  exchange: "0x5f1c2c8f0c3f2e34a36f55ae4b80e594b81b33c8a41cfdf450d35bf51211ccc5",
  erc721: "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74",
};

export const DISCORD_URL = "https://discord.com/invite/thundermarket";
export const TWITTER_URL = "https://twitter.com/ThunderbyFuel";
export const MEDIUM_URL = "https://medium.com/@ThunderbyFuel/";
export const GUTHUB_URL = "https://thunder-nft-marketplace.gitbook.io/thunder-nft-marketplace";

export const lineaChainId = 59144;
export const goerliWethAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
export const lineaWethAddress = "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f";
export const lineaExplorerLink = "https://lineascan.build/address/";
export const fueldExplorerLink = "https://fuellabs.github.io/block-explorer-v2/address/";

export const erc1155ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const wethABI = [
  { constant: true, inputs: [], name: "name", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" },
  {
    constant: false,
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  { constant: true, inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  { constant: false, inputs: [{ name: "wad", type: "uint256" }], name: "withdraw", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  { constant: false, inputs: [], name: "deposit", outputs: [], payable: true, stateMutability: "payable", type: "function" },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
];
