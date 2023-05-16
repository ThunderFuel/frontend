import { readFileSync } from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked, NativeAssetId } from "fuels";
import path from "path";

import { PoolAbi__factory } from "../../types/pool/factories/PoolAbi__factory";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import { TransferSelectorAbi__factory } from "../../types/transfer_selector/factories/TransferSelectorAbi__factory";
import { TransferManagerAbi__factory } from "../../types/transfer_manager/factories/TransferManagerAbi__factory";
import { NFTAbi__factory } from "../../types/erc721/factories/NFTAbi__factory";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory";
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange/factories/ThunderExchangeAbi__factory";

import * as Pool from "../pool";
import * as ExecutionManager from "../execution_manager";
import * as RoyaltyManager from "../royalty_manager";
import * as AssetManager from "../asset_manager";
import * as TransferSelector from "../transfer_selector";
import * as TransferManager from "../transfer_managers";
import * as ERC721 from "../erc721";
import * as Strategy from "../execution_strategies";
import * as Exchange from "./exchange";

let pool: Contract;
let executionManager: Contract;
let royaltyManager: Contract;
let assetManager: Contract;
let transferSelector: Contract;
let transferManager: Contract;
let erc721: Contract;
let strategyFixedPrice: Contract;
let strategyAuction: Contract;
let exchange: Contract;
let contracts: Exchange.Contracts;

const localTestnet = new Provider("http://127.0.0.1:4000/graphql");
const beta3Testnet = new Provider("https://beta-3.fuel.network/graphql");

const main = async (provider: Provider) => {
  const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", provider);
  const RECIPIENT = new WalletUnlocked("0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb", provider);
  const TM1155 = "0x1230000000000000000000000000000000000000000000000000000000000abc";

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const deployAll = async () => {
    /////////////////////////////////////////////////////////////////////////
    //                          CONTRACTS DEPLOYMENT                       //
    /////////////////////////////////////////////////////////////////////////

    // Deploy Exchange
    const exchangeBytecode = readFileSync(path.join(__dirname, "../../bin-files/thunder_exchange.bin"));
    const exchangeFactory = new ContractFactory(exchangeBytecode, ThunderExchangeAbi__factory.abi, OWNER);
    exchange = await exchangeFactory.deployContract({ gasPrice: 1 });
    console.log(`Exchange contract id: ${exchange.id.toB256()}`);
    await sleep(1500);

    // Deploy AssetManager
    const assetManagerBytecode = readFileSync(path.join(__dirname, "../../bin-files/asset_manager.bin"));
    const assetManagerFactory = new ContractFactory(assetManagerBytecode, AssetManagerAbi__factory.abi, OWNER);
    assetManager = await assetManagerFactory.deployContract({ gasPrice: 1 });
    console.log(`AssetManager contract id: ${assetManager.id.toB256()}`);
    await sleep(1500);

    // Deploy Pool
    const poolBytecode = readFileSync(path.join(__dirname, "../../bin-files/pool.bin"));
    const poolFactory = new ContractFactory(poolBytecode, PoolAbi__factory.abi, OWNER);
    pool = await poolFactory.deployContract({ gasPrice: 1 });
    console.log(`Pool contract id: ${pool.id.toB256()}`);
    await sleep(1500);

    // Deploy Strategy Fixed Price Sale
    const strategyBytecode = readFileSync(path.join(__dirname, "../../bin-files/strategy_fixed_price_sale.bin"));
    const strategyFactory = new ContractFactory(strategyBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
    strategyFixedPrice = await strategyFactory.deployContract({ gasPrice: 1 });
    console.log(`StrategyFixedPrice contract id: ${strategyFixedPrice.id.toB256()}`);
    await sleep(1500);

    // Deploy Strategy Auction
    const strategyAuctionBytecode = readFileSync(path.join(__dirname, "../../bin-files/strategy_auction.bin"));
    const strategyAuctionFactory = new ContractFactory(strategyAuctionBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
    strategyAuction = await strategyAuctionFactory.deployContract({ gasPrice: 1 });
    console.log(`StrategyAuction contract id: ${strategyAuction.id.toB256()}`);
    await sleep(1500);

    // Deploy Execution Manager
    const executionManagerBytecode = readFileSync(path.join(__dirname, "../../bin-files/execution_manager.bin"));
    const executionManagerFactory = new ContractFactory(executionManagerBytecode, ExecutionManagerAbi__factory.abi, OWNER);
    executionManager = await executionManagerFactory.deployContract({ gasPrice: 1 });
    console.log(`ExecutionManager contract id: ${executionManager.id.toB256()}`);
    await sleep(1500);

    // Deploy Transfer Manager
    const transferManagerBytecode = readFileSync(path.join(__dirname, "../../bin-files/transfer_manager.bin"));
    const transferManagerFactory = new ContractFactory(transferManagerBytecode, TransferManagerAbi__factory.abi, OWNER);
    transferManager = await transferManagerFactory.deployContract({ gasPrice: 1 });
    console.log(`TransferManager contract id: ${transferManager.id.toB256()}`);
    await sleep(1500);

    // Deploy Transfer Selector
    const transferSelectorBytecode = readFileSync(path.join(__dirname, "../../bin-files/transfer_selector.bin"));
    const transferSelectorFactory = new ContractFactory(transferSelectorBytecode, TransferSelectorAbi__factory.abi, OWNER);
    transferSelector = await transferSelectorFactory.deployContract({ gasPrice: 1 });
    console.log(`TransferSelector contract id: ${transferSelector.id.toB256()}`);
    await sleep(1500);

    // Deploy Royalty Manager
    const royaltyManagerBytecode = readFileSync(path.join(__dirname, "../../bin-files/royalty_manager.bin"));
    const royaltyManagerFactory = new ContractFactory(royaltyManagerBytecode, RoyaltyManagerAbi__factory.abi, OWNER);
    royaltyManager = await royaltyManagerFactory.deployContract({ gasPrice: 1 });
    console.log(`RoyaltyManager contract id: ${royaltyManager.id.toB256()}`);
    await sleep(1500);

    // Deploy NFT
    const nftBytecode = readFileSync(path.join(__dirname, "../../bin-files/NFT.bin"));
    const nftFactory = new ContractFactory(nftBytecode, NFTAbi__factory.abi, OWNER);
    erc721 = await nftFactory.deployContract({ gasPrice: 1 });
    console.log(`ERC721 contract id: ${erc721.id.toB256()}`);
    await sleep(1500);

    /////////////////////////////////////////////////////////////////////////
    //                          CONTRACTS INIT                             //
    /////////////////////////////////////////////////////////////////////////

    // Initialize Exchange
    const { transactionResult: exchangeInit } = await Exchange.initialize(exchange.id.toString(), provider.url, OWNER.privateKey);
    console.log(`exchange init: ${exchangeInit.status.type}`);
    await sleep(3000);

    const { transactionResult: setEM } = await Exchange.setExecutionManager(exchange.id.toString(), provider.url, OWNER.privateKey, executionManager.id.toB256());
    console.log(`set execution manager: ${setEM.status.type}`);
    await sleep(3000);

    const { transactionResult: setTS } = await Exchange.setTransferSelector(exchange.id.toString(), provider.url, OWNER.privateKey, transferSelector.id.toB256());
    console.log(`set transfer selector: ${setTS.status.type}`);
    await sleep(2000);

    const { transactionResult: setRM } = await Exchange.setRoyaltyManager(exchange.id.toString(), provider.url, OWNER.privateKey, royaltyManager.id.toB256());
    console.log(`set royalty manager: ${setRM.status.type}`);
    await sleep(2000);

    const { transactionResult: setAM } = await Exchange.setAssetManager(exchange.id.toString(), provider.url, OWNER.privateKey, assetManager.id.toB256());
    console.log(`set asset manager: ${setAM.status.type}`);
    await sleep(2000);

    const { transactionResult: setFR } = await Exchange.setProtocolFeeRecipient(exchange.id.toString(), provider.url, OWNER.privateKey, RECIPIENT.address.toB256(), true);
    console.log(`set fee recipient: ${setFR.status.type}`);
    await sleep(2000);

    const { transactionResult: setPool } = await Exchange.setPool(exchange.id.toString(), provider.url, OWNER.privateKey, pool.id.toB256());
    console.log(`set pool: ${setPool.status.type}`);
    await sleep(2000);

    // Initialize AssetManager
    const { transactionResult: assetManagerInit } = await AssetManager.initialize(assetManager.id.toString(), provider.url, OWNER.privateKey);
    console.log(`asset manager init: ${assetManagerInit.status.type}`);
    await sleep(2000);

    const { transactionResult: addAssetTx } = await AssetManager.addAsset(assetManager.id.toString(), provider.url, OWNER.privateKey, NativeAssetId);
    console.log(`add asset: ${addAssetTx.status.type}`);
    await sleep(2000);

    // Initialize Pool
    const { transactionResult: poolInit } = await Pool.initialize(pool.id.toString(), provider.url, OWNER.privateKey, exchange.id.toB256(), assetManager.id.toB256());
    console.log(`pool init: ${poolInit.status.type}`);
    await sleep(3000);

    // Initialize Strategy Fixed Price Sale
    const { transactionResult: fixedPriceInit } = await Strategy.initialize(strategyFixedPrice.id.toString(), provider.url, OWNER.privateKey, exchange.id.toB256());
    console.log(`fixed price init: ${fixedPriceInit?.status.type}`);
    await sleep(3000);

    const { transactionResult: setProtocolFeeTx } = await Strategy.setProtocolFee(strategyFixedPrice.id.toString(), provider.url, OWNER.privateKey, 250);
    console.log(`setProtocolFee tx: ${setProtocolFeeTx?.status.type}`);
    await sleep(3500);

    // Initialize Strategy Auction
    const { transactionResult: auctionInit } = await Strategy.initialize(strategyAuction.id.toString(), provider.url, OWNER.privateKey, exchange.id.toB256());
    console.log(`auction init: ${auctionInit?.status.type}`);
    await sleep(3500);

    const { transactionResult: auctionSetFeeTx } = await Strategy.setProtocolFee(strategyAuction.id.toString(), provider.url, OWNER.privateKey, 250);
    console.log(`auction set fee: ${auctionSetFeeTx?.status.type}`);
    await sleep(3500);

    // Initialize Execution Manager
    const { transactionResult: executionManagerInit } = await ExecutionManager.initialize(executionManager.id.toString(), provider.url, OWNER.privateKey);
    console.log(`execution manager init: ${executionManagerInit.status.type}`);
    await sleep(4000);

    const { transactionResult: addFixedPrice } = await ExecutionManager.addStrategy(executionManager.id.toString(), provider.url, OWNER.privateKey, strategyFixedPrice.id.toB256());
    console.log(`add fixed price strategy: ${addFixedPrice.status.type}`);
    await sleep(4000);

    const { transactionResult: addAuction } = await ExecutionManager.addStrategy(executionManager.id.toString(), provider.url, OWNER.privateKey, strategyAuction.id.toB256());
    console.log(`add auction strategy: ${addAuction.status.type}`);
    await sleep(4000);

    // Initialize Transfer Manager
    const { transactionResult: tmInit } = await TransferManager.initialize(transferManager.id.toString(), provider.url, OWNER.privateKey, exchange.id.toB256());
    console.log(`transfer manager init: ${tmInit.status.type}`);
    await sleep(4000);

    // Initialize Transfer Selector
    const { transactionResult: tsInit } = await TransferSelector.initialize(transferSelector.id.toString(), provider.url, OWNER.privateKey, transferManager.id.toB256(), TM1155);
    console.log(`transfer selector init: ${tsInit.status.type}`);
    await sleep(5000);

    // Initialize Royalty Manager
    const { transactionResult: rmInit } = await RoyaltyManager.initialize(royaltyManager.id.toString(), provider.url, OWNER.privateKey);
    console.log(`royalty manager init: ${rmInit.status.type}`);
    await sleep(5000);

    const { transactionResult: rmSetFee } = await RoyaltyManager.setRoyaltyFeeLimit(royaltyManager.id.toString(), provider.url, OWNER.privateKey, 1000);
    console.log(`royalty manager set fee: ${rmSetFee.status.type}`);
    await sleep(5000);

    // Initialize NFT
    const { transactionResult: erc721Init } = await ERC721.initialize(erc721.id.toString(), provider.url, OWNER.privateKey, 10000, transferManager.id.toB256());
    console.log(`erc721 init: ${erc721Init.status.type}`);
    await sleep(5000);

    const { transactionResult: registerRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
      royaltyManager.id.toString(),
      provider.url,
      OWNER.privateKey,
      erc721.id.toB256(),
      OWNER.address.toB256(),
      true,
      500
    );
    console.log(`royalty registry: ${registerRoyalty.status.type}`);
    await sleep(6000);

    const nftContract = NFTAbi__factory.connect(erc721.id, OWNER);
    const { transactionResult: mintTx } = await nftContract.functions
      .mint(20, { Address: { value: OWNER.address.toB256() } })
      .txParams({ gasPrice: 1 })
      .call();
    console.log(`mint: ${mintTx.status.type}`);
    await sleep(6000);

    const { transactionResult: approvalTx } = await nftContract.functions
      .set_approval_for_all(true, { ContractId: { value: transferManager.id.toB256() } })
      .txParams({ gasPrice: 1 })
      .call();
    console.log(`approval: ${approvalTx.status.type}`);
    await sleep(6000);

    contracts = {
      pool: pool.id.toB256(),
      executionManager: executionManager.id.toB256(),
      royaltyManager: royaltyManager.id.toB256(),
      assetManager: assetManager.id.toB256(),
      transferSelector: transferSelector.id.toB256(),
      transferManager: transferManager.id.toB256(),
      strategyFixedPrice: strategyFixedPrice.id.toB256(),
      strategyAuction: strategyAuction.id.toB256(),
    };
    Exchange.setContracts(contracts, provider);
    console.log([contracts, exchange.id.toB256(), erc721.id.toB256()]);
    return contracts;
  };

  await deployAll();
};

main(beta3Testnet)
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
