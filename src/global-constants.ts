export const THUNDER_THEME_NAME = "thunder_theme";

export const provider = "https://beta-5.fuel.network/graphql";
export const FUEL_FAUCET_URL = "https://faucet-beta-5.fuel.network";
export const FUEL_EXPLORER_URL = "https://app.fuel.network/";

export const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const poolContractId = "0x8dad4bc41accf5c8a4d326ba513c7bccba075c4906ef1826f2cbf7409514a112";
export const executionManagerContractId = "0x0bc0b9787481eea6bde1396600d1bc00a7e26018c9433d5a6c79fbe9e2d51aa1";
export const royaltyManagerContractId = "0xf855df441b733d49ee9d738138ec38567fde35dbbb1ef08dac3c8e4f3e4a7908";
export const assetManagerContractId = "0xe2591588f3dfaeb28053d6d509f16053272b9c58481bdd504dd7cb537a3504f0";
export const strategyFixedPriceContractId = "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f";
export const strategyAuctionContractId = "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f";
export const exchangeContractId = "0xc5fbe89423bc290215a184f4e607e39340ef475b27f5b761fb9fa873bc937700";
export const ERC721ContractId = "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74";

// StrategyAuction contract id: 0x9b68a29813a329fa9c4d270a7c19081e369d332075ebb357a9fcb40824d88654

export const contracts = {
  pool: "0x8dad4bc41accf5c8a4d326ba513c7bccba075c4906ef1826f2cbf7409514a112",
  executionManager: "0x0bc0b9787481eea6bde1396600d1bc00a7e26018c9433d5a6c79fbe9e2d51aa1",
  royaltyManager: "0xf855df441b733d49ee9d738138ec38567fde35dbbb1ef08dac3c8e4f3e4a7908",
  assetManager: "0xe2591588f3dfaeb28053d6d509f16053272b9c58481bdd504dd7cb537a3504f0",
  strategyFixedPrice: "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f",
  strategyAuction: "0x9b68a29813a329fa9c4d270a7c19081e369d332075ebb357a9fcb40824d88654",
  // exchange: "0xc5fbe89423bc290215a184f4e607e39340ef475b27f5b761fb9fa873bc937700",
  // erc721: "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74",
};

export const DISCORD_URL = "https://discord.com/invite/thundermarket";

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
