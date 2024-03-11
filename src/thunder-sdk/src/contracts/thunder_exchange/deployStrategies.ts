import { readFileSync } from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked, BaseAssetId } from 'fuels';
import path from 'path';

import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory"
import { StrategyAuctionAbi__factory } from "../../types/execution_strategies/strategy_auction/factories/StrategyAuctionAbi__factory"

import { MakerOrder } from "./index";

import * as Strategy from '../execution_strategies';
import * as ExecutionManager from '../execution_manager';
import * as Exchange from './exchange';

let strategyFixedPrice: Contract;
let strategyAuction: Contract;
let contracts: Exchange.Contracts;

const testnet = "https://beta-5.fuel.network/graphql";

const main = async (_provider: string) => {
    const provider = await Provider.create(_provider)
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
        console.log(`fixed price init: ${fixedPriceInit?.isStatusSuccess}`)
        await sleep(2000);

        const { transactionResult: setProtocolFeeTx } = await Strategy.setProtocolFee(
            strategyFixedPrice.id.toString(),
            provider.url,
            OWNER.privateKey,
            250
        );
        console.log(`setProtocolFee tx: ${setProtocolFeeTx?.isStatusSuccess}`)
        await sleep(2500);

        // Initialize Strategy Auction
        const { transactionResult: auctionInit } = await Strategy.initialize(
            strategyAuction.id.toString(),
            provider.url,
            OWNER.privateKey,
            EXCHANGE,
        );
        console.log(`auction init: ${auctionInit?.isStatusSuccess}`)
        await sleep(2500);

        const { transactionResult: auctionSetFeeTx } = await Strategy.setProtocolFee(
            strategyAuction.id.toString(),
            provider.url,
            OWNER.privateKey,
            250
        );
        console.log(`auction set fee: ${auctionSetFeeTx?.isStatusSuccess}`)
        await sleep(2500);

        // Initialize Execution Manager
        const { transactionResult: addFixedPrice } = await ExecutionManager.addStrategy(
            EM,
            provider.url,
            OWNER.privateKey,
            strategyFixedPrice.id.toB256()
        );
        console.log(`add fixed price strategy: ${addFixedPrice.isStatusSuccess}`)
        await sleep(3000);

        const { transactionResult: addAuction } = await ExecutionManager.addStrategy(
            EM,
            provider.url,
            OWNER.privateKey,
            strategyAuction.id.toB256()
        );
        console.log(`add auction strategy: ${addAuction.isStatusSuccess}`)
        await sleep(3000);

        contracts = {
            pool: "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c",
            executionManager: EM,
            royaltyManager: "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e",
            assetManager: "0xa0732def1afa51e5fe6d8ada46824fbe794b2959e901875b219055b80a076891",
            strategyFixedPrice: strategyFixedPrice.id.toB256(),
            //strategyAuction: strategyAuction.id.toB256(),
        }
        Exchange.setContracts(contracts, provider);
        console.log([contracts, EXCHANGE])
        return contracts
    }

    await deploy();
}

// const mockorder = async () => {
//     const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";
//     const exchange = "0x88ccf5f44f586bc962e5f2a6945fa1b0b0309d79606660a05bb6d5d8fb4b3db9"
//     const provider = "https://beta-3.fuel.network/graphql"
//     const holder = new WalletUnlocked("0xda095454134996e62333131a81b77794f3edca42036dff09a51ca72ab6ebc1d2", beta3Testnet);
//     const tm = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22"

//     contracts = {
//         pool: "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c",
//         executionManager: "0xbaad27814dcfca96d88c209e80e4a5cc6fbaac6e07ba1ef75ca0fdbe54878f06",
//         royaltyManager: "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e",
//         assetManager: "0xa0732def1afa51e5fe6d8ada46824fbe794b2959e901875b219055b80a076891",
//         strategyFixedPrice: "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5",
//         //strategyAuction: "0x7a6f0b6e7a181cb0d21b99e4703eb706dbc00fa385726af5e7124dde4d286276",
//     }
//     Exchange.setContracts(contracts, new Provider(provider));

//     let temp = {
//         isBuySide: false,
//         maker: "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307",
//         collection: "0x985cfb25b18153750b51024e559670d093d81c97b22467a3cc849e211de055c3",
//         token_id: "1",
//         price: 100,
//         amount: 1,
//         nonce: 56,
//         strategy: "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5",
//         payment_asset: BaseAssetId,
//         expiration_range: 100000,
//         extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 },
//     }

//     // const orders2: MakerOrder[] = []
//     // for (let i = 1; i <= 28; i++) {
//     //   temp.nonce = temp.nonce + 1;
//     //   orders2.push({
//     //     isBuySide: false,
//     //     maker: "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307",
//     //     collection: "0x985cfb25b18153750b51024e559670d093d81c97b22467a3cc849e211de055c3",
//     //     token_id: 12,
//     //     price: 100,
//     //     amount: 1,
//     //     nonce: i,
//     //     strategy: "0xe7eee87bd0771ea08f1ae462643f91fea9fc49be6f4359a07e616ce885f8f83f",
//     //     payment_asset: NativeAssetId,
//     //     expiration_range: 100000,
//     //     extra_params: { extra_address_param: ZERO_B256, extra_contract_param: ZERO_B256, extra_u64_param: 0 },
//     //   })
//     // }

//     const res = await bulkPlaceOrder(exchange, provider, holder, tm, [temp])
//     console.log(res.transactionResult.isStatusSuccess)
// }

main(testnet)
    .then((res) => { return res })
    .catch((err) => console.log(err));
