import { readFileSync } from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked, BaseAssetId } from 'fuels';
import path from 'path';

import { PoolAbi__factory } from "../../types/pool/factories/PoolAbi__factory";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory"
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange/factories/ThunderExchangeAbi__factory";

import * as Pool from '../pool';
import * as ExecutionManager from '../execution_manager';
import * as RoyaltyManager from '../royalty_manager';
import * as AssetManager from '../asset_manager';
import * as Strategy from '../execution_strategies';
import * as Exchange from './exchange';

let pool: Contract;
let executionManager: Contract;
let royaltyManager: Contract;
let assetManager: Contract;
let transferSelector: Contract;
let strategyFixedPrice: Contract;
let strategyAuction: Contract;
let exchange: Contract;
let contracts: Exchange.Contracts;

const testnet = "https://beta-5.fuel.network/graphql";

const main = async (_provider: string) => {
    const provider = await Provider.create(_provider)
    const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", provider);
    const RECIPIENT = new WalletUnlocked("0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb", provider);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const deployAll = async () => {

          /////////////////////////////////////////////////////////////////////////
         //                          CONTRACTS DEPLOYMENT                       //
        /////////////////////////////////////////////////////////////////////////

        // Deploy Exchange
        const exchangeBytecode = readFileSync(path.join(__dirname, '../../bin-files/thunder_exchange.bin'));
        const exchangeFactory = new ContractFactory(exchangeBytecode, ThunderExchangeAbi__factory.abi, OWNER);
        exchange = await exchangeFactory.deployContract({gasPrice: 1});
        console.log(`Exchange contract id: ${exchange.id.toB256()}`)
        await sleep(1500);

        // Deploy AssetManager
        const assetManagerBytecode = readFileSync(path.join(__dirname, '../../bin-files/asset_manager.bin'));
        const assetManagerFactory = new ContractFactory(assetManagerBytecode, AssetManagerAbi__factory.abi, OWNER);
        assetManager = await assetManagerFactory.deployContract({gasPrice: 1});
        console.log(`AssetManager contract id: ${assetManager.id.toB256()}`)
        await sleep(1500);

        // Deploy Pool
        const poolBytecode = readFileSync(path.join(__dirname, '../../bin-files/pool.bin'));
        const poolFactory = new ContractFactory(poolBytecode, PoolAbi__factory.abi, OWNER);
        pool = await poolFactory.deployContract({gasPrice: 1});
        console.log(`Pool contract id: ${pool.id.toB256()}`)
        await sleep(1500);

        // Deploy Strategy Fixed Price Sale
        const strategyBytecode = readFileSync(path.join(__dirname, '../../bin-files/strategy_fixed_price_sale.bin'));
        const strategyFactory = new ContractFactory(strategyBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
        strategyFixedPrice = await strategyFactory.deployContract({gasPrice: 1});
        console.log(`StrategyFixedPrice contract id: ${strategyFixedPrice.id.toB256()}`)
        await sleep(1500);

        // // Deploy Strategy Auction
        // const strategyAuctionBytecode = readFileSync(path.join(__dirname, '../../bin-files/strategy_auction.bin'));
        // const strategyAuctionFactory = new ContractFactory(strategyAuctionBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
        // strategyAuction = await strategyAuctionFactory.deployContract({gasPrice: 1});
        // console.log(`StrategyAuction contract id: ${strategyAuction.id.toB256()}`)
        // await sleep(1500);

        // Deploy Execution Manager
        const executionManagerBytecode = readFileSync(path.join(__dirname, '../../bin-files/execution_manager.bin'));
        const executionManagerFactory = new ContractFactory(executionManagerBytecode, ExecutionManagerAbi__factory.abi, OWNER);
        executionManager = await executionManagerFactory.deployContract({gasPrice: 1});
        console.log(`ExecutionManager contract id: ${executionManager.id.toB256()}`)
        await sleep(1500);

        // Deploy Royalty Manager
        const royaltyManagerBytecode = readFileSync(path.join(__dirname, '../../bin-files/royalty_manager.bin'));
        const royaltyManagerFactory = new ContractFactory(royaltyManagerBytecode, RoyaltyManagerAbi__factory.abi, OWNER);
        royaltyManager = await royaltyManagerFactory.deployContract({gasPrice: 1});
        console.log(`RoyaltyManager contract id: ${royaltyManager.id.toB256()}`)
        await sleep(1500);

          /////////////////////////////////////////////////////////////////////////
         //                          CONTRACTS INIT                             //
        /////////////////////////////////////////////////////////////////////////

        // Initialize Exchange
        const { transactionResult: exchangeInit } = await Exchange.initialize(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
        );
        console.log(`exchange init: ${exchangeInit.isStatusSuccess}`)
        await sleep(3000);

        const { transactionResult: setEM } = await Exchange.setExecutionManager(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
            executionManager.id.toB256(),
        );
        console.log(`set execution manager: ${setEM.isStatusSuccess}`)
        await sleep(3000);

        const { transactionResult: setRM } = await Exchange.setRoyaltyManager(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
            royaltyManager.id.toB256(),
        );
        console.log(`set royalty manager: ${setRM.isStatusSuccess}`)
        await sleep(2000);

        const { transactionResult: setAM } = await Exchange.setAssetManager(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
            assetManager.id.toB256(),
        );
        console.log(`set asset manager: ${setAM.isStatusSuccess}`)
        await sleep(2000);

        const { transactionResult: setFR } = await Exchange.setProtocolFeeRecipient(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
            RECIPIENT.address.toB256(),
            true
        );
        console.log(`set fee recipient: ${setFR.isStatusSuccess}`)
        await sleep(2000);

        const { transactionResult: setPool } = await Exchange.setPool(
            exchange.id.toString(),
            provider.url,
            OWNER.privateKey,
            pool.id.toB256()
        );
        console.log(`set pool: ${setPool.isStatusSuccess}`)
        await sleep(2000);

        // Initialize AssetManager
        const { transactionResult: assetManagerInit } = await AssetManager.initialize(
            assetManager.id.toString(),
            provider.url,
            OWNER.privateKey
        );
        console.log(`asset manager init: ${assetManagerInit.isStatusSuccess}`)
        await sleep(2000);

        const { transactionResult: addAssetTx } = await AssetManager.addAsset(
            assetManager.id.toString(),
            provider.url,
            OWNER.privateKey,
            BaseAssetId
        );
        console.log(`add asset: ${addAssetTx.isStatusSuccess}`)
        await sleep(2000);

        // Initialize Pool
        const { transactionResult: poolInit } = await Pool.initialize(
            pool.id.toString(),
            provider.url,
            OWNER.privateKey,
            exchange.id.toB256(),
            assetManager.id.toB256()
        );
        console.log(`pool init: ${poolInit.isStatusSuccess}`)
        await sleep(3000);

        // Initialize Strategy Fixed Price Sale
        const { transactionResult: fixedPriceInit } = await Strategy.initialize(
            strategyFixedPrice.id.toString(),
            provider.url,
            OWNER.privateKey,
            exchange.id.toB256(),
        );
        console.log(`fixed price init: ${fixedPriceInit?.isStatusSuccess}`)
        await sleep(3000);

        const { transactionResult: setProtocolFeeTx } = await Strategy.setProtocolFee(
            strategyFixedPrice.id.toString(),
            provider.url,
            OWNER.privateKey,
            250
        );
        console.log(`setProtocolFee tx: ${setProtocolFeeTx?.isStatusSuccess}`)
        await sleep(3500);

        // // Initialize Strategy Auction
        // const { transactionResult: auctionInit } = await Strategy.initialize(
        //     strategyAuction.id.toString(),
        //     provider.url,
        //     OWNER.privateKey,
        //     exchange.id.toB256(),
        // );
        // console.log(`auction init: ${auctionInit?.isStatusSuccess}`)
        // await sleep(3500);

        // const { transactionResult: auctionSetFeeTx } = await Strategy.setProtocolFee(
        //     strategyAuction.id.toString(),
        //     provider.url,
        //     OWNER.privateKey,
        //     250
        // );
        // console.log(`auction set fee: ${auctionSetFeeTx?.isStatusSuccess}`)
        // await sleep(3500);

        // Initialize Execution Manager
        const { transactionResult: executionManagerInit } = await ExecutionManager.initialize(
            executionManager.id.toString(),
            provider.url,
            OWNER.privateKey
        );
        console.log(`execution manager init: ${executionManagerInit.isStatusSuccess}`)
        await sleep(4000);

        const { transactionResult: addFixedPrice } = await ExecutionManager.addStrategy(
            executionManager.id.toString(),
            provider.url,
            OWNER.privateKey,
            strategyFixedPrice.id.toB256()
        );
        console.log(`add fixed price strategy: ${addFixedPrice.isStatusSuccess}`)
        await sleep(4000);

        // const { transactionResult: addAuction } = await ExecutionManager.addStrategy(
        //     executionManager.id.toString(),
        //     provider.url,
        //     OWNER.privateKey,
        //     strategyAuction.id.toB256()
        // );
        // console.log(`add auction strategy: ${addAuction.isStatusSuccess}`)
        // await sleep(4000);

        // Initialize Royalty Manager
        const { transactionResult: rmInit } = await RoyaltyManager.initialize(
            royaltyManager.id.toString(),
            provider.url,
            OWNER.privateKey
        );
        console.log(`royalty manager init: ${rmInit.isStatusSuccess}`)
        await sleep(5000);

        const { transactionResult: rmSetFee } = await RoyaltyManager.setRoyaltyFeeLimit(
            royaltyManager.id.toString(),
            provider.url,
            OWNER.privateKey,
            1000
        );
        console.log(`royalty manager set fee: ${rmSetFee.isStatusSuccess}`)
        await sleep(5000);

        contracts = {
            pool: pool.id.toB256(),
            executionManager: executionManager.id.toB256(),
            royaltyManager: royaltyManager.id.toB256(),
            assetManager: assetManager.id.toB256(),
            strategyFixedPrice: strategyFixedPrice.id.toB256(),
            //strategyAuction: "0x0000000000000000000000000000000000000000000000000000000000000000",
        }
        Exchange.setContracts(contracts, provider);
        console.log([contracts, exchange.id.toB256()])
        return contracts
    }

    await deployAll()
}

main(testnet)
    .then((res) => { return res })
    .catch((err) => console.log(err));
