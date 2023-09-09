export const provider = "https://beta-3.fuel.network/graphql";
export const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const exchangeContractId = "0x88ccf5f44f586bc962e5f2a6945fa1b0b0309d79606660a05bb6d5d8fb4b3db9";
export const assetManagerContractId = "0xa0732def1afa51e5fe6d8ada46824fbe794b2959e901875b219055b80a076891";
export const poolContractId = "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c";
export const strategyFixedPriceContractId = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5";
export const strategyAuctionContractId = "0x7a6f0b6e7a181cb0d21b99e4703eb706dbc00fa385726af5e7124dde4d286276";
export const executionManagerContractId = "0xbaad27814dcfca96d88c209e80e4a5cc6fbaac6e07ba1ef75ca0fdbe54878f06";
export const transferManagerContractId = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22";
export const transferSelectorContractId = "0xbb55fd1eac8df688b719ddfc2374d911db743523e13d81ded77100a4e0ae1277";
export const royaltyManagerContractId = "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e";
export const ERC721ContractId = "0x2a5b42c6e92ac8aad4ac0b9fbc582b3f291d66dbe983fc27f228bf2298ff9baa";

export const contracts = {
  pool: "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c",
  executionManager: "0xbaad27814dcfca96d88c209e80e4a5cc6fbaac6e07ba1ef75ca0fdbe54878f06",
  royaltyManager: "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e",
  assetManager: "0xa0732def1afa51e5fe6d8ada46824fbe794b2959e901875b219055b80a076891",
  transferSelector: "0xbb55fd1eac8df688b719ddfc2374d911db743523e13d81ded77100a4e0ae1277",
  transferManager: "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22",
  strategyFixedPrice: "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5",
  strategyAuction: "0x7a6f0b6e7a181cb0d21b99e4703eb706dbc00fa385726af5e7124dde4d286276",
  exchange: "0x88ccf5f44f586bc962e5f2a6945fa1b0b0309d79606660a05bb6d5d8fb4b3db9",
  erc721: "0x2a5b42c6e92ac8aad4ac0b9fbc582b3f291d66dbe983fc27f228bf2298ff9baa",
};

export const goerliWethAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
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
