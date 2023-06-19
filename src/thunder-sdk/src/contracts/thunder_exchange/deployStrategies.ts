import { readFileSync } from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked, NativeAssetId } from 'fuels';
import path from 'path';

import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory"
import { StrategyAuctionAbi__factory } from "../../types/execution_strategies/strategy_auction/factories/StrategyAuctionAbi__factory"

import * as Strategy from '../execution_strategies';
import * as ExecutionManager from '../execution_manager';
import * as Exchange from './exchange';

let strategyFixedPrice: Contract;
let strategyAuction: Contract;
let contracts: Exchange.Contracts;

const localTestnet = new Provider('http://127.0.0.1:4000/graphql');
const beta3Testnet = new Provider("https://beta-3.fuel.network/graphql");

const main = async (provider: Provider) => {
    const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", provider);
    const EXCHANGE = "0x88ccf5f44f586bc962e5f2a6945fa1b0b0309d79606660a05bb6d5d8fb4b3db9";
    const EM = "0xbaad27814dcfca96d88c209e80e4a5cc6fbaac6e07ba1ef75ca0fdbe54878f06";

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const deploy = async () => {

          /////////////////////////////////////////////////////////////////////////
         //                          CONTRACTS DEPLOYMENT                       //
        /////////////////////////////////////////////////////////////////////////

        // Deploy Strategy Fixed Price Sale
        const strategyBytecode = readFileSync(path.join(__dirname, '../../bin-files/strategy_fixed_price_sale.bin'));
        const strategyFactory = new ContractFactory(strategyBytecode, StrategyFixedPriceSaleAbi__factory.abi, OWNER);
        strategyFixedPrice = await strategyFactory.deployContract({gasPrice: 1});
        console.log(`StrategyFixedPrice contract id: ${strategyFixedPrice.id.toB256()}`)
        await sleep(1500);

        // Deploy Strategy Auction
        const strategyAuctionBytecode = readFileSync(path.join(__dirname, '../../bin-files/strategy_auction.bin'));
        const strategyAuctionFactory = new ContractFactory(strategyAuctionBytecode, StrategyAuctionAbi__factory.abi, OWNER);
        strategyAuction = await strategyAuctionFactory.deployContract({gasPrice: 1});
        console.log(`StrategyAuction contract id: ${strategyAuction.id.toB256()}`)
        await sleep(1500);

          /////////////////////////////////////////////////////////////////////////
         //                          CONTRACTS INIT                             //
        /////////////////////////////////////////////////////////////////////////

        // Initialize Strategy Fixed Price Sale
        const { transactionResult: fixedPriceInit } = await Strategy.initialize(
            strategyFixedPrice.id.toString(),
            provider.url,
            OWNER.privateKey,
            EXCHANGE,
        );
        console.log(`fixed price init: ${fixedPriceInit?.status.type}`)
        await sleep(2000);

        const { transactionResult: setProtocolFeeTx } = await Strategy.setProtocolFee(
            strategyFixedPrice.id.toString(),
            provider.url,
            OWNER.privateKey,
            250
        );
        console.log(`setProtocolFee tx: ${setProtocolFeeTx?.status.type}`)
        await sleep(2500);

        // Initialize Strategy Auction
        const { transactionResult: auctionInit } = await Strategy.initialize(
            strategyAuction.id.toString(),
            provider.url,
            OWNER.privateKey,
            EXCHANGE,
        );
        console.log(`auction init: ${auctionInit?.status.type}`)
        await sleep(2500);

        const { transactionResult: auctionSetFeeTx } = await Strategy.setProtocolFee(
            strategyAuction.id.toString(),
            provider.url,
            OWNER.privateKey,
            250
        );
        console.log(`auction set fee: ${auctionSetFeeTx?.status.type}`)
        await sleep(2500);

        // Initialize Execution Manager
        const { transactionResult: addFixedPrice } = await ExecutionManager.addStrategy(
            EM,
            provider.url,
            OWNER.privateKey,
            strategyFixedPrice.id.toB256()
        );
        console.log(`add fixed price strategy: ${addFixedPrice.status.type}`)
        await sleep(3000);

        const { transactionResult: addAuction } = await ExecutionManager.addStrategy(
            EM,
            provider.url,
            OWNER.privateKey,
            strategyAuction.id.toB256()
        );
        console.log(`add auction strategy: ${addAuction.status.type}`)
        await sleep(3000);

        contracts = {
            pool: "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c",
            executionManager: EM,
            royaltyManager: "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e",
            assetManager: "0xa0732def1afa51e5fe6d8ada46824fbe794b2959e901875b219055b80a076891",
            transferSelector: "0xbb55fd1eac8df688b719ddfc2374d911db743523e13d81ded77100a4e0ae1277",
            transferManager: "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22",
            strategyFixedPrice: strategyFixedPrice.id.toB256(),
            strategyAuction: strategyAuction.id.toB256(),
        }
        Exchange.setContracts(contracts, provider);
        console.log([contracts, EXCHANGE])
        return contracts
    }

    await deploy();
}

main(beta3Testnet)
    .then((res) => { return res })
    .catch((err) => console.log(err));
