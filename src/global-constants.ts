import { coinbaseWallet, injected, walletConnect } from "@wagmi/connectors";
import { CHAIN_IDS, type FuelConfig, Provider } from "fuels";
import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { QueryClient } from "@tanstack/react-query";
import { structuralSharing } from "@wagmi/core/query";
import { getDefaultConnectors } from "utils/getDefaultConnectors";

export const THUNDER_THEME_NAME = "thunder_theme";
export const WALLET_CONNECT_PROJECT_ID = "fbbe076e89456ef4f6f54493682058b9";

export const providerTestnet = "https://testnet.fuel.network/v1/graphql";
export const FUEL_PROVIDER_URL = "https://thunder:BQ-2H1ZFHZvq0_xa62g0zA@mainnet.fuel.network/v1/graphql";
export const FUEL_FAUCET_URL = "https://faucet-testnet.fuel.network/";
export const FUEL_TESTNET_EXPLORER_URL = "https://next-app.fuel.network/";
export const FUEL_EXPLORER_URL = "https://app-mainnet.fuel.network/";
export const FUEL_BRIDGE_URL = "https://app-mainnet.fuel.network/bridge?from=eth&to=fuel";

export const poolContractId = "0x773ca186f811c1655be9d6dcc84aef437cf25c2ebe8c367810529a8ee53fc92a";
export const executionManagerContractId = "0xd5af7d47d518a679495f5ebd6de51bc8ddffbe173f3c1775d90f7acb7e6655ad";
export const royaltyManagerContractId = "0x2340a412a77607108d160926222632dd427bafc6f57e185c0140c849d88b8e99";
export const assetManagerContractId = "0x1b3de4f663c79fce77ff5a0ae4d92693c3a2001f6d7e39c3d16eb1a80df38fe6";
export const strategyFixedPriceContractId = "0xfb2b92c17160f9856664bde85bec51f5839d565898d489a6ef8fcb9b73575b57";
export const strategyAuctionContractId = "0x9ffe3ca6b3e042b57527e078dbabfefcfb84708251d9ce2cf20220b564bda4a4";
export const exchangeContractId = "0x243ef4c2301f44eecbeaf1c39fee9379664b59a2e5b75317e8c7e7f26a25ed4d";
export const ERC721ContractId = "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74";

// StrategyAuction contract id: 0x9b68a29813a329fa9c4d270a7c19081e369d332075ebb357a9fcb40824d88654

export const contracts = {
  pool: poolContractId,
  executionManager: executionManagerContractId,
  royaltyManager: royaltyManagerContractId,
  assetManager: assetManagerContractId,
  strategyFixedPrice: strategyFixedPriceContractId,
  exchange: exchangeContractId,
  erc721: ERC721ContractId,
};

export const DISCORD_URL = "https://discord.com/invite/thundermarket";
export const TWITTER_URL = "https://twitter.com/ThunderbyFuel";
export const MEDIUM_URL = "https://medium.com/@ThunderbyFuel/";
export const GITHUB_DOCUMENT_URL = "https://thunder-nft-marketplace.gitbook.io/thunder-nft-marketplace";
export const GITHUB_URL = "https://github.com/ThunderFuel";

export const HELP_CENTER_URL = "https://thunder-nft-marketplace.gitbook.io/thunder-nft-marketplace";
export const CHAT_SUPPORT_URL = "https://discord.com/invite/thundermarket";

export const lineaChainId = 59144;
export const goerliWethAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
export const lineaWethAddress = "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f";
export const lineaExplorerLink = "https://lineascan.build/address/";
export const fueldExplorerLink = "https://app.fuel.network/account/";

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

export const FINALLY_MAINNET = "finally_mainnet";

// Should be consistent accross project
// export const FUEL_PROVIDER_URL = FUEL_URLS[CHAIN_IDS.fuel.mainnet];

export const FUEL_NETWORKS = [
  {
    chainId: CHAIN_IDS.fuel.mainnet,
    url: FUEL_PROVIDER_URL,
  },
  {
    chainId: CHAIN_IDS.eth.mainnet,
    url: "https://eth-mainnet.g.alchemy.com/v2/ALrOqgm050KBPMryg1gQ8tp7SILcoepK",
  },
];
const METADATA = {
  name: "Wallet Demo",
  description: "Fuel Wallets Demo",
  url: location.href,
  icons: ["https://connectors.fuel.network/logo_white.png"],
};

export const WAGMI_CONFIG = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: false }),
    walletConnect({
      projectId: WALLET_CONNECT_PROJECT_ID,
      metadata: METADATA,
      showQrModal: false,
    }),
    coinbaseWallet({
      appName: METADATA.name,
      appLogoUrl: METADATA.icons[0],
      darkMode: true,
      reloadOnDisconnect: true,
    }),
  ],
});
export const FUEL_PROVIDER = Provider.create(FUEL_PROVIDER_URL);
export const FUEL_CONFIG: FuelConfig = {
  connectors: getDefaultConnectors({
    wcProjectId: WALLET_CONNECT_PROJECT_ID,
    ethWagmiConfig: WAGMI_CONFIG,
    chainId: CHAIN_IDS.fuel.mainnet,
    fuelProvider: FUEL_PROVIDER,
  }),
};

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing,
    },
  },
});
