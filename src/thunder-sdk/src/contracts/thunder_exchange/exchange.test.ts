import fs from 'fs';
import { Contract, ContractFactory, Provider, WalletUnlocked, BaseAssetId, sleep } from 'fuels';
import path from 'path';

import { PoolAbi__factory } from "../../types/pool/factories/PoolAbi__factory";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
// import { TransferSelectorAbi__factory } from "../../types/transfer_selector/factories/TransferSelectorAbi__factory";
// import { TransferManagerAbi__factory } from "../../types/transfer_manager/factories/TransferManagerAbi__factory";
// import { NFTAbi__factory } from "../../types/erc721/factories/NFTAbi__factory";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory"
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange/factories/ThunderExchangeAbi__factory";

import * as Pool from '../pool';
import * as ExecutionManager from '../execution_manager';
import * as RoyaltyManager from '../royalty_manager';
import * as AssetManager from '../asset_manager';
import * as ERC721 from '../erc721';
import * as Strategy from '../execution_strategies';
import * as Exchange from './exchange';

let pool: Contract;
let executionManager: Contract;
let royaltyManager: Contract;
let assetManager: Contract;
let transferSelector: Contract;
let transferManager: Contract;
let erc721: Contract;
let strategy: Contract;
let exchange: Contract;
let contracts: Exchange.Contracts;

const PROVIDER = new Provider('http://127.0.0.1:4000/graphql');
const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
const NFT_OWNER = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
const USER = new WalletUnlocked("0x862512a2363db2b3a375c0d4bbbd27172180d89f23f2e259bac850ab02619301", PROVIDER);
const USER2 = new WalletUnlocked("0x7f8a325504e7315eda997db7861c9447f5c3eff26333b20180475d94443a10c6", PROVIDER);
const RECIPIENT = new WalletUnlocked("0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb", PROVIDER);
const TM1155 = "0x1230000000000000000000000000000000000000000000000000000000000abc";
const ASSET = "0x1000000000000000000000000000000000000000000000000000000000000abc";
const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";

const ZERO_EXTRA_PARAMS: Exchange.ExtraParams = {
    extra_address_param: ZERO_B256,
    extra_contract_param: ZERO_B256,
    extra_u64_param: 0,
}

describe('Exchange', () => {
    // beforeAll(async () => {
    //     // Deploy Exchange
    //     const exchangeBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/thunder_exchange/out/debug/thunder_exchange.bin'));
    //     const exchangeFactory = new ContractFactory(exchangeBytecode, ThunderExchangeAbi__factory.abi, OWNER);
    //     exchange = await exchangeFactory.deployContract();

    //     // Initialize Exchange
    //     const { transactionResult: exchangeResult } = await Exchange.initialize(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //     );
    //     expect(exchangeResult?.status.type).toBe("success");
    //     const { value } = await Exchange.owner(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //     );
    //     expect(value?.Address?.value).toBe(OWNER.address.toB256());

    //     // Deploy AssetManager
    //     const assetManagerBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/asset_manager/out/debug/asset_manager.bin'));
    //     const assetManagerFactory = new ContractFactory(assetManagerBytecode, AssetManagerAbi__factory.abi, OWNER);
    //     assetManager = await assetManagerFactory.deployContract();

    //     // Initialize AssetManager
    //     const { transactionResult } = await AssetManager.initialize(
    //         assetManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey
    //     );
    //     const { transactionResult: result } = await AssetManager.addAsset(
    //         assetManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         BaseAssetId
    //     );
    //     expect(transactionResult?.status.type).toBe("success");
    //     expect(result?.status.type).toBe("success");

    //     // Deploy Pool
    //     const poolBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/pool/out/debug/pool.bin'));
    //     const poolFactory = new ContractFactory(poolBytecode, PoolAbi__factory.abi, OWNER);
    //     pool = await poolFactory.deployContract();

    //     // Initialize Pool
    //     const { transactionResult: poolResult } = await Pool.initialize(
    //         pool.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         exchange.id.toB256(),
    //         assetManager.id.toB256()
    //     );
    //     expect(poolResult.status.type).toBe("success");

    //     // Deploy Strategy
    //     const strategyBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/execution_strategies/strategy_fixed_price_sale/out/debug/strategy_fixed_price_sale.bin'));
    //     const strategyFactory = new ContractFactory(strategyBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
    //     strategy = await strategyFactory.deployContract();

    //     // Initialize Strategy
    //     const { transactionResult: sResult } = await Strategy.initialize(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         exchange.id.toB256(),
    //     );
    //     expect(sResult?.status.type).toBe("success");

    //     const { transactionResult: protocolFeeRes } = await Strategy.setProtocolFee(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         250
    //     );
    //     expect(protocolFeeRes?.status.type).toBe("success");

    //     // Deploy Execution Manager
    //     const executionManagerBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/execution_manager/out/debug/execution_manager.bin'));
    //     const executionManagerFactory = new ContractFactory(executionManagerBytecode, ExecutionManagerAbi__factory.abi, OWNER);
    //     executionManager = await executionManagerFactory.deployContract();

    //     // Initialize Execution Manager
    //     const { transactionResult: executionManagerResult } = await ExecutionManager.initialize(
    //         executionManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey
    //     );
    //     const { transactionResult: addStrategy } = await ExecutionManager.addStrategy(
    //         executionManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         strategy.id.toB256()
    //     );
    //     expect(executionManagerResult.status.type).toBe("success");
    //     expect(addStrategy.status.type).toBe("success");

    //     // Deploy Transfer Manager
    //     const transferManagerBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/transfer_manager/out/debug/transfer_manager.bin'));
    //     const transferManagerFactory = new ContractFactory(transferManagerBytecode, TransferManagerAbi__factory.abi, OWNER);
    //     transferManager = await transferManagerFactory.deployContract();

    //     // Initialize Transfer Manager
    //     const { transactionResult: tmInitialize } = await TransferManager.initialize(
    //         transferManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         exchange.id.toB256()
    //     );
    //     expect(tmInitialize.status.type).toBe("success");

    //     // Deploy Transfer Selector
    //     const transferSelectorBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/transfer_selector/out/debug/transfer_selector.bin'));
    //     const transferSelectorFactory = new ContractFactory(transferSelectorBytecode, TransferSelectorAbi__factory.abi, OWNER);
    //     transferSelector = await transferSelectorFactory.deployContract();

    //     // Initialize Transfer Selector
    //     const { transactionResult: tsResult } = await TransferSelector.initialize(
    //         transferSelector.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         transferManager.id.toB256(),
    //         TM1155,
    //     );
    //     expect(tsResult.status.type).toBe("success");

    //     // Deploy Royalty Manager
    //     const royaltyManagerBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/royalty_manager/out/debug/royalty_manager.bin'));
    //     const royaltyManagerFactory = new ContractFactory(royaltyManagerBytecode, RoyaltyManagerAbi__factory.abi, OWNER);
    //     royaltyManager = await royaltyManagerFactory.deployContract();

    //     // Initialize Royalty Manager
    //     const { transactionResult: rmResult } = await RoyaltyManager.initialize(
    //         royaltyManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey
    //     );
    //     expect(rmResult.status.type).toBe("success");

    //     const { transactionResult: royaltyFeeRes } = await RoyaltyManager.setRoyaltyFeeLimit(
    //         royaltyManager.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         1000
    //     );
    //     expect(royaltyFeeRes.status.type).toBe("success");

    //     // Deploy NFT
    //     const nftBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/erc721/out/debug/NFT.bin'));
    //     const nftFactory = new ContractFactory(nftBytecode, NFTAbi__factory.abi, NFT_OWNER);
    //     erc721 = await nftFactory.deployContract();

    //     // Initialize NFT
    //     const { transactionResult: nftResult } = await ERC721.initialize(
    //         erc721.id.toString(),
    //         PROVIDER.url,
    //         NFT_OWNER.privateKey,
    //         10000,
    //         transferManager.id.toB256()
    //     );
    //     expect(nftResult.status.type).toBe("success");

    //     const { transactionResult: registerRes } = await RoyaltyManager.registerRoyaltyInfo(
    //         royaltyManager.id.toString(),
    //         PROVIDER.url,
    //         NFT_OWNER.privateKey,
    //         erc721.id.toB256(),
    //         NFT_OWNER.address.toB256(),
    //         true,
    //         500
    //     );
    //     expect(registerRes.status.type).toBe("success");

    //     const nftContract = NFTAbi__factory.connect(erc721.id, USER);
    //     const { transactionResult: mintResult } = await nftContract.functions.mint(20, { Address: { value: USER.address.toB256() } })
    //         .txParams({gasPrice: 1})
    //         .call()
    //     const { transactionResult: approvalResult } = await nftContract.functions.set_approval_for_all(true, { ContractId: { value: transferManager.id.toB256() } })
    //         .txParams({gasPrice: 1})
    //         .call()
    //     expect(mintResult.status.type).toBe("success");
    //     expect(approvalResult.status.type).toBe("success");

    //     contracts = {
    //         pool: pool.id.toB256(),
    //         executionManager: executionManager.id.toB256(),
    //         royaltyManager: royaltyManager.id.toB256(),
    //         assetManager: assetManager.id.toB256(),
    //         transferSelector: transferSelector.id.toB256(),
    //         transferManager: transferManager.id.toB256(),
    //         strategyFixedPrice: strategy.id.toB256(),
    //         strategyAuction: strategy.id.toB256(),
    //     }
    //     Exchange.setContracts(contracts, PROVIDER);
    //     console.log([contracts, exchange.id.toB256(), erc721.id.toB256()])
    // }, 30000);

    // it('should not initialize again', async () => {
    //     await expect(async () => {
    //         await Exchange.initialize(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             OWNER.privateKey,
    //         )
    //     }).rejects.toThrow();
    // });

    // it('should set execution manager', async () => {
    //     const { transactionResult } = await Exchange.setExecutionManager(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         executionManager.id.toB256(),
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value } = await Exchange.getExecutionManager(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.value).toBe(executionManager.id.toB256());
    // });

    // it('should set transfer selector', async () => {
    //     const { transactionResult } = await Exchange.setTransferSelector(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         transferSelector.id.toB256(),
    //     );
    //     expect(transactionResult.status.type).toBe("success");
    //     const { value } = await Exchange.getTransferSelector(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.value).toBe(transferSelector.id.toB256());
    // });

    // it('should set royalty manager', async () => {
    //     const { transactionResult } = await Exchange.setRoyaltyManager(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         royaltyManager.id.toB256(),
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value } = await Exchange.getRoyaltyManager(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.value).toBe(royaltyManager.id.toB256());
    // });

    // it('should set asset manager', async () => {
    //     const { transactionResult } = await Exchange.setAssetManager(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         assetManager.id.toB256(),
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value } = await Exchange.getAssetManager(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.value).toBe(assetManager.id.toB256());
    // });

    // it('should set protocol fee recipient', async () => {
    //     const { transactionResult } = await Exchange.setProtocolFeeRecipient(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         RECIPIENT.address.toB256(),
    //         true
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value } = await Exchange.getProtocolFeeRecipient(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.Address?.value).toBe(RECIPIENT.address.toB256());
    // });

    // it('should set pool', async () => {
    //     const { transactionResult } = await Exchange.setPool(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         OWNER.privateKey,
    //         pool.id.toB256()
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value } = await Exchange.getPool(
    //         exchange.id.toString(),
    //         PROVIDER.url
    //     );
    //     expect(value?.value).toBe(pool.id.toB256());
    // });

    // it('should not be callable by non-owner', async () => {
    //     await expect(async () => {
    //         await Exchange.setExecutionManager(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             USER.privateKey,
    //             executionManager.id.toB256(),
    //         )
    //     }).rejects.toThrow();

    //     await expect(async () => {
    //         await Exchange.setTransferSelector(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             USER.privateKey,
    //             transferSelector.id.toB256(),
    //         )
    //     }).rejects.toThrow();

    //     await expect(async () => {
    //         await Exchange.setRoyaltyManager(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             USER.privateKey,
    //             royaltyManager.id.toB256(),
    //         )
    //     }).rejects.toThrow();

    //     await expect(async () => {
    //         await Exchange.setAssetManager(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             USER.privateKey,
    //             assetManager.id.toB256(),
    //         )
    //     }).rejects.toThrow();

    //     await expect(async () => {
    //         await Exchange.setProtocolFeeRecipient(
    //             exchange.id.toString(),
    //             PROVIDER.url,
    //             USER.privateKey,
    //             RECIPIENT.address.toB256(),
    //             true
    //         )
    //     }).rejects.toThrow();
    // }, 7000);

    // it('should list nft', async () => {
    //     const order: Exchange.MakerOrder = {
    //         isBuySide: false,
    //         maker: USER.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 1,
    //         price: 100,
    //         amount: 1,
    //         nonce: 1,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 2,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     }

    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         order,
    //     );
    //     const { value } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         1,
    //         false
    //     );
    //     const { value: nonce } = await Strategy.getOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         false,
    //     );
    //     expect(transactionResult.status.type).toBe("success");
    //     expect(Number(nonce)).toStrictEqual(1);

    //     expect(order.isBuySide ?
    //         { Buy: [] } :
    //         { Sell: [] }
    //     ).toStrictEqual(value?.side);
    //     expect(order.maker).toStrictEqual(value?.maker.value);
    //     expect(order.collection).toStrictEqual(value?.collection.value);
    //     expect(order.token_id).toStrictEqual(Number(value?.token_id));
    //     expect(order.price).toStrictEqual(Number(value?.price));
    //     expect(order.amount).toStrictEqual(Number(value?.amount));
    //     expect(order.nonce).toStrictEqual(Number(value?.nonce));
    //     expect(order.strategy).toStrictEqual(value?.strategy.value);
    //     expect(order.payment_asset).toStrictEqual(value?.payment_asset.value);
    //     expect(order.expiration_range).toStrictEqual(
    //         Number(value?.end_time.toString().substring(10)) -
    //         Number(value?.start_time.toString().substring(10))
    //     );
    // });

    // it('should be valid before expire', async () => {
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         1,
    //         false
    //     );
    //     expect(value).toBeTruthy();
    // });

    // it('should be invalid after expire', async () => {
    //     function sleep(ms: number) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //     }
    //     await sleep(2500);
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         1,
    //         false
    //     );
    //     expect(value).toBeFalsy();
    // }, 3000);

    // it('should update listing', async () => {
    //     let order: Exchange.MakerOrder = {
    //         isBuySide: false,
    //         maker: USER.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 2,
    //         price: 100,
    //         amount: 1,
    //         nonce: 2,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 1000,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     }

    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         order,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     order.price = 200;
    //     order.expiration_range = 3600;
    //     const { transactionResult: update } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         order,
    //     );
    //     expect(update.status.type).toBe("success");

    //     const { value } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         2,
    //         false
    //     );
    //     expect(Number(value?.price)).toStrictEqual(200);
    //     expect(
    //         Number(value?.end_time.toString().substring(10)) -
    //         Number(value?.start_time.toString().substring(10))
    //     ).toBe(3600);
    // });

    // it('should cancel sell order', async () => {
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         2,
    //         false
    //     );
    //     expect(value).toBeTruthy();

    //     const { transactionResult } = await Exchange.cancelOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         strategy.id.toB256(),
    //         2,
    //         false,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value: isValid } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         2,
    //         false
    //     );
    //     expect(isValid).toBeFalsy();
    // });

    // it('should make offer', async () => {
    //     const { transactionResult: depositResult } = await Pool.deposit(
    //         pool.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         150,
    //         BaseAssetId,
    //         assetManager.id.toB256()
    //     );
    //     expect(depositResult.status.type).toBe("success");

    //     let order: Exchange.MakerOrder = {
    //         isBuySide: true,
    //         maker: USER2.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 1,
    //         price: 150,
    //         amount: 1,
    //         nonce: 1,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 2,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     }

    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         order,
    //     );
    //     const { value } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         1,
    //         true
    //     );
    //     const { value: nonce } = await Strategy.getOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         true,
    //     );
    //     expect(transactionResult.status.type).toBe("success");
    //     expect(Number(nonce)).toStrictEqual(1);

    //     expect(order.isBuySide ?
    //         { Buy: [] } :
    //         { Sell: [] }
    //     ).toStrictEqual(value?.side);
    //     expect(order.maker).toStrictEqual(value?.maker.value);
    //     expect(order.collection).toStrictEqual(value?.collection.value);
    //     expect(order.token_id).toStrictEqual(Number(value?.token_id));
    //     expect(order.price).toStrictEqual(Number(value?.price));
    //     expect(order.amount).toStrictEqual(Number(value?.amount));
    //     expect(order.nonce).toStrictEqual(Number(value?.nonce));
    //     expect(order.strategy).toStrictEqual(value?.strategy.value);
    //     expect(order.payment_asset).toStrictEqual(value?.payment_asset.value);
    //     expect(order.expiration_range).toStrictEqual(
    //         Number(value?.end_time.toString().substring(10)) -
    //         Number(value?.start_time.toString().substring(10))
    //     );
    // });

    // it('should be valid before offer expires', async () => {
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         1,
    //         true
    //     );
    //     expect(value).toBeTruthy();
    // });

    // it('should be invalid after offer expires', async () => {
    //     function sleep(ms: number) {
    //         return new Promise(resolve => setTimeout(resolve, ms));
    //     }
    //     await sleep(2500);
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         1,
    //         true
    //     );
    //     expect(value).toBeFalsy();
    // }, 3000);

    // it('should update offer', async () => {
    //     let order: Exchange.MakerOrder = {
    //         isBuySide: true,
    //         maker: USER2.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 1,
    //         price: 150,
    //         amount: 1,
    //         nonce: 2,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 2,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     }

    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         order,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     order.price = 100;
    //     order.expiration_range = 3600;
    //     const { transactionResult: update } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         order,
    //     );
    //     expect(update.status.type).toBe("success");

    //     const { value } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         2,
    //         true
    //     );
    //     expect(Number(value?.price)).toStrictEqual(100);
    //     expect(
    //         Number(value?.end_time.toString().substring(10)) -
    //         Number(value?.start_time.toString().substring(10))
    //     ).toBe(3600);
    // });

    // it('should cancel offer', async () => {
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         2,
    //         true
    //     );
    //     expect(value).toBeTruthy();

    //     const { transactionResult } = await Exchange.cancelOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         strategy.id.toB256(),
    //         2,
    //         true,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value: isValid } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         2,
    //         true
    //     );
    //     expect(isValid).toBeFalsy();
    // });

    // it('should buy now', async () => {
    //     const order: Exchange.MakerOrder = {
    //         isBuySide: false,
    //         maker: USER.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 2,
    //         price: 1000,
    //         amount: 1,
    //         nonce: 3,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 20,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     };
    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         order,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const preBalanceSeller = await USER.getBalance(BaseAssetId);
    //     const preBalanceRoyaltyRecipient = await NFT_OWNER.getBalance(BaseAssetId);
    //     const preBalanceFeeRecipient = await RECIPIENT.getBalance(BaseAssetId);

    //     const takerOrder: Exchange.TakerOrder = {
    //         isBuySide: true,
    //         taker: USER2.address.toB256(),
    //         maker: USER.address.toB256(),
    //         nonce: 3,
    //         price: 1000,
    //         token_id: 2,
    //         collection: erc721.id.toB256(),
    //         strategy: strategy.id.toB256(),
    //         extra_params: ZERO_EXTRA_PARAMS
    //     };
    //     const { transactionResult: res } = await Exchange.executeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         takerOrder,
    //         BaseAssetId
    //     );
    //     expect(res.status.type).toBe("success");

    //     const postBalanceSeller = await USER.getBalance(BaseAssetId);
    //     const postBalanceRoyaltyRecipient = await NFT_OWNER.getBalance(BaseAssetId);
    //     const postBalanceFeeRecipient = await RECIPIENT.getBalance(BaseAssetId);
    //     const { value: owner } = await ERC721.ownerOf(
    //         erc721.id.toString(),
    //         PROVIDER.url,
    //         2
    //     );
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         3,
    //         false
    //     );
    //     const { value: makerOrder } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         3,
    //         false
    //     );

    //     expect(
    //         Number(postBalanceRoyaltyRecipient) -
    //         Number(preBalanceRoyaltyRecipient)
    //     ).toStrictEqual(50);
    //     expect(
    //         Number(postBalanceFeeRecipient) -
    //         Number(preBalanceFeeRecipient)
    //     ).toStrictEqual(25);
    //     expect(
    //         Number(postBalanceSeller) -
    //         Number(preBalanceSeller)
    //     ).toStrictEqual(925);
    //     expect(owner?.Address?.value).toBe(USER2.address.toB256());
    //     expect(value).toBeFalsy();
    //     expect(makerOrder).toBeUndefined();
    // });

    // it('should accept offer', async () => {
    //     const { transactionResult: depositResult } = await Pool.deposit(
    //         pool.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         1000,
    //         BaseAssetId,
    //         assetManager.id.toB256()
    //     );
    //     expect(depositResult.status.type).toBe("success");

    //     const order: Exchange.MakerOrder = {
    //         isBuySide: true,
    //         maker: USER2.address.toB256(),
    //         collection: erc721.id.toB256(),
    //         token_id: 1,
    //         price: 1000,
    //         amount: 1,
    //         nonce: 3,
    //         strategy: strategy.id.toB256(),
    //         payment_asset: BaseAssetId,
    //         expiration_range: 20,
    //         extra_params: ZERO_EXTRA_PARAMS
    //     }
    //     const { transactionResult } = await Exchange.placeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         order,
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const takerOrder: Exchange.TakerOrder = {
    //         isBuySide: false,
    //         taker: USER.address.toB256(),
    //         maker: USER2.address.toB256(),
    //         nonce: 3,
    //         price: 1000,
    //         token_id: 1,
    //         collection: erc721.id.toB256(),
    //         strategy: strategy.id.toB256(),
    //         extra_params: ZERO_EXTRA_PARAMS,
    //     }

    //     const preBalanceSeller = await USER.getBalance(BaseAssetId);
    //     const preBalanceRoyaltyRecipient = await NFT_OWNER.getBalance(BaseAssetId);
    //     const preBalanceFeeRecipient = await RECIPIENT.getBalance(BaseAssetId);

    //     const { transactionResult: executeResult } = await Exchange.executeOrder(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         takerOrder,
    //         BaseAssetId,
    //     );
    //     expect(executeResult.status.type).toBe("success");

    //     const { value: owner } = await ERC721.ownerOf(
    //         erc721.id.toString(),
    //         PROVIDER.url,
    //         1
    //     );
    //     const { value } = await Strategy.isValidOrder(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         3,
    //         true
    //     );
    //     const { value: makerOrder } = await Strategy.getMakerOrderOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         3,
    //         true
    //     );

    //     const postBalanceSeller = await USER.getBalance(BaseAssetId);
    //     const postBalanceRoyaltyRecipient = await NFT_OWNER.getBalance(BaseAssetId);
    //     const postBalanceFeeRecipient = await RECIPIENT.getBalance(BaseAssetId);

    //     expect(
    //         Number(postBalanceRoyaltyRecipient) -
    //         Number(preBalanceRoyaltyRecipient)
    //     ).toStrictEqual(50);
    //     expect(
    //         Number(postBalanceFeeRecipient) -
    //         Number(preBalanceFeeRecipient)
    //     ).toStrictEqual(25);
    //     expect(
    //         Number(postBalanceSeller) -
    //         Number(preBalanceSeller)
    //     ).toStrictEqual(925 - 1);
    //     expect(owner?.Address?.value).toBe(USER2.address.toB256());
    //     expect(value).toBeFalsy();
    //     expect(makerOrder).toBeUndefined();
    // });

    // it('should cancel all buy maker orders', async () => {
    //     const { transactionResult } = await Exchange.cancelAllOrdersBySide(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER2.privateKey,
    //         strategy.id.toB256(),
    //         true
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value: nonce } = await Strategy.getOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         true
    //     );
    //     const { value: minNonce } = await Strategy.getMinOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER2.address.toB256(),
    //         true
    //     );
    //     expect(nonce).toStrictEqual(minNonce);
    // });

    // it('should cancel all sell maker orders', async () => {
    //     const { transactionResult } = await Exchange.cancelAllOrdersBySide(
    //         exchange.id.toString(),
    //         PROVIDER.url,
    //         USER.privateKey,
    //         strategy.id.toB256(),
    //         false
    //     );
    //     expect(transactionResult.status.type).toBe("success");

    //     const { value: nonce } = await Strategy.getOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         false
    //     );
    //     const { value: minNonce } = await Strategy.getMinOrderNonceOfUser(
    //         strategy.id.toString(),
    //         PROVIDER.url,
    //         USER.address.toB256(),
    //         false
    //     );
    //     expect(nonce).toStrictEqual(minNonce);
    // });
});
