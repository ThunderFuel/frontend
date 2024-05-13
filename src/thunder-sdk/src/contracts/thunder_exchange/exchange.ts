import { Provider, WalletUnlocked, WalletLocked, CoinQuantityLike, Contract, BigNumberish, FunctionInvocationScope, ReceiptMintCoder, Script } from "fuels";
import { ThunderExchangeAbi__factory, ThunderExchangeAbi } from "../../types/thunder_exchange";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory";
import { StrategyAuctionAbi__factory } from "../../types/execution_strategies/strategy_auction/factories/StrategyAuctionAbi__factory";
import { PoolAbi__factory, } from "../../types/pool/factories/PoolAbi__factory";
import { PoolAbi } from "../../types/pool/PoolAbi"
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import { NFTContractAbi__factory } from "../../types/erc721/factories/NFTContractAbi__factory";
//import { ThunderExchangeAbi, IdentityInput, ContractIdInput, MakerOrderInputInput, SideInput, TakerOrderInput, ExtraParamsInput } from "../../types/thunder_exchange/ThunderExchangeAbi";
import { Option } from "../../types/thunder_exchange/common";

import bytecode from "../../scripts/deposit_and_offer/binFile";
import abi from "../../scripts/deposit_and_offer/out/deposit_and_offer-abi.json";
import { NFTContractAbi } from "../../types/erc721";

type AssetIdInput = { value: string };
type AddressInput = { value: string };
type ContractIdInput = { value: string };
type ExtraParamsInput = { extra_address_param: AddressInput, extra_contract_param: ContractIdInput, extra_u64_param: BigNumberish };
//type MakerOrderInput = { side: SideInput, maker: AddressInput, collection: ContractIdInput, token_id: string, price: BigNumberish, amount: BigNumberish, nonce: BigNumberish, strategy: ContractIdInput, payment_asset: AssetIdInput, start_time: BigNumberish, end_time: BigNumberish, extra_params: ExtraParamsInput };
type MakerOrderInputInput = { side: SideInput, maker: AddressInput, collection: ContractIdInput, token_id: string, price: BigNumberish, amount: BigNumberish, nonce: BigNumberish, strategy: ContractIdInput, payment_asset: AssetIdInput, expiration_range: BigNumberish, extra_params: ExtraParamsInput };
type TakerOrderInput = { side: SideInput, taker: AddressInput, maker: AddressInput, nonce: BigNumberish, price: BigNumberish, token_id: string, collection: ContractIdInput, strategy: ContractIdInput, extra_params: ExtraParamsInput };
enum SideInput { Buy = 'Buy', Sell = 'Sell' };
type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type MakerOrder = {
    isBuySide: boolean;
    maker: string;
    collection: string;
    token_id: BigNumberish;
    price: BigNumberish;
    amount: BigNumberish;
    nonce: BigNumberish;
    strategy: string;
    payment_asset: string;
    expiration_range: BigNumberish;
    extra_params: ExtraParams;
}

export type TakerOrder = {
    isBuySide: boolean,
    taker: string;
    maker: string;
    nonce: BigNumberish;
    price: BigNumberish;
    token_id: BigNumberish;
    collection: string;
    strategy: string;
    extra_params: ExtraParams;
}

export type BulkCancelOrderParam = {
    strategy: string,
    nonce: BigNumberish,
    isBuySide: boolean,
}

export type ExtraParams = {
    extra_address_param: string;
    extra_contract_param: string;
    extra_u64_param: BigNumberish;
}

export type Contracts = {
    pool: string,
    executionManager: string,
    royaltyManager: string,
    assetManager: string,
    strategyFixedPrice: string,
    strategyAuction: string,
}

let pool: Contract;
let executionManager: Contract;
let royaltyManager: Contract;
let assetManager: Contract;
let strategyFixedPrice: Contract;
let strategyAuction: Contract;

export function setContracts(
    contracts: Contracts,
    provider: Provider
) {
    pool = new Contract(contracts.pool, PoolAbi__factory.abi, provider);
    executionManager = new Contract(contracts.executionManager, ExecutionManagerAbi__factory.abi, provider);
    royaltyManager = new Contract(contracts.royaltyManager, RoyaltyManagerAbi__factory.abi, provider);
    assetManager = new Contract(contracts.assetManager, AssetManagerAbi__factory.abi, provider);
    strategyFixedPrice = new Contract(contracts.strategyFixedPrice, StrategyFixedPriceSaleAbi__factory.abi, provider);
    strategyAuction = new Contract(contracts.strategyAuction, StrategyAuctionAbi__factory.abi, provider);
}

function _convertToInput(makerOrder: MakerOrder): MakerOrderInputInput {
    const zeroX = "0x";
    const fill0 = makerOrder.token_id.toString().padStart(64, "0")
    const subId = fill0.padStart(66, zeroX)

    const extraParams: ExtraParamsInput = {
        extra_address_param: { value: makerOrder.extra_params.extra_address_param },
        extra_contract_param: { value: makerOrder.extra_params.extra_contract_param },
        extra_u64_param: makerOrder.extra_params.extra_u64_param,
    };

    const output: MakerOrderInputInput = {
        side: makerOrder.isBuySide ? SideInput.Buy : SideInput.Sell,
        maker: { value: makerOrder.maker },
        collection: { value: makerOrder.collection },
        token_id: subId,
        price: makerOrder.price,
        amount: makerOrder.amount,
        nonce: makerOrder.nonce,
        strategy: { value: makerOrder.strategy },
        payment_asset: { value: makerOrder.payment_asset },
        expiration_range: makerOrder.expiration_range,
        extra_params: extraParams,
    }

    return output
}

function _convertToTakerOrder(takerOrder: TakerOrder): TakerOrderInput {
    const zeroX = "0x";
    const fill0 = takerOrder.token_id.toString().padStart(64, "0")
    const subId = fill0.padStart(66, zeroX)

    const extraParams: ExtraParamsInput = {
        extra_address_param: { value: takerOrder.extra_params.extra_address_param },
        extra_contract_param: { value: takerOrder.extra_params.extra_contract_param },
        extra_u64_param: takerOrder.extra_params.extra_u64_param,
    };

    const output: TakerOrderInput = {
        side: takerOrder.isBuySide ? SideInput.Buy : SideInput.Sell,
        taker: { value: takerOrder.taker },
        maker: { value: takerOrder.maker },
        collection: { value: takerOrder.collection },
        token_id: subId,
        price: takerOrder.price,
        nonce: takerOrder.nonce,
        strategy: { value: takerOrder.strategy },
        extra_params: extraParams,
    }

    return output
}

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<ThunderExchangeAbi> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return ThunderExchangeAbi__factory.connect(contractId, walletUnlocked);
    } else if (wallet && typeof wallet !== "string") {
        return ThunderExchangeAbi__factory.connect(contractId, wallet);
    }

    return ThunderExchangeAbi__factory.connect(contractId, _provider);
}

async function poolSetup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<PoolAbi> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return PoolAbi__factory.connect(contractId, walletUnlocked);
    } else if (wallet && typeof wallet !== "string") {
        return PoolAbi__factory.connect(contractId, wallet);
    }

    return PoolAbi__factory.connect(contractId, _provider);
}

async function erc721Setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<NFTContractAbi> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return NFTContractAbi__factory.connect(contractId, walletUnlocked);
    } else if (wallet && typeof wallet !== "string") {
        return NFTContractAbi__factory.connect(contractId, wallet);
    }

    return NFTContractAbi__factory.connect(contractId, _provider);
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { transactionResult } = await contract.functions
            .initialize()
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. initialize failed. Reason: ${err}`)
    }
}

export async function placeOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: MakerOrder,
) {
    if (order.isBuySide) {
        const { transactionResult } = await _placeBuyOrder(
            contractId,
            provider,
            wallet,
            order
        );
        return { transactionResult }
    }
    const { transactionResult } = await _placeSellOrder(
        contractId,
        provider,
        wallet,
        order,
    );
    return { transactionResult }
}

async function _placeSellOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: MakerOrder,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _provider = await Provider.create(provider);
        const _order = _convertToInput(order);

        const assetId = ReceiptMintCoder.getAssetId(order.collection, _order.token_id);
        const asset: CoinQuantityLike = { amount: order.amount, assetId: assetId };

        let strategy: Contract;
        strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new Contract(order.collection, NFTContractAbi__factory.abi, _provider);
        const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
        const { gasUsed } = await contract.functions
            .place_order(_order)
            .txParams({gasPrice: 200000})
            .callParams({forward: asset})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .place_order(_order)
            .txParams({gasPrice: 200000, gasLimit})
            .callParams({forward: asset})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. _placeSellOrder failed. Reason: ${err}`)
    }
}

async function _placeBuyOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: MakerOrder,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _provider = await Provider.create(provider);
        const _order = _convertToInput(order);

        let strategy: Contract;
        strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new Contract(order.collection, NFTContractAbi__factory.abi, _provider);
        const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
        const { gasUsed } = await contract.functions
            .place_order(_order)
            .txParams({gasPrice: 1})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .place_order(_order)
            .txParams({gasPrice: 1, gasLimit})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. _placeBuyOrder failed. Reason: ${err}`)
    }
}

export async function updateOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: MakerOrder,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _provider = await Provider.create(provider);
        const _order = _convertToInput(order);

        let strategy: Contract;
        strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new Contract(order.collection, NFTContractAbi__factory.abi, _provider);
        const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
        const { gasUsed } = await contract.functions
            .update_order(_order)
            .txParams({gasPrice: 1})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .update_order(_order)
            .txParams({gasPrice: 1, gasLimit})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. updateOrder failed. Reason: ${err}`)
    }
}

export async function depositAndOffer(
    contractId: string,
    provider: string,
    wallet: WalletLocked,
    order: MakerOrder,
    requiredBidAmount: BigNumberish,
    assetId: string,
    isUpdate: boolean,
) {
    if(!order.isBuySide) throw Error("only buy side");

    try {
        const contract = await setup(contractId, provider, wallet);
        const coin: CoinQuantityLike = { amount: requiredBidAmount, assetId: assetId };
        const _provider = await Provider.create(provider);
        const _order = _convertToInput(order);

        let strategy: Contract;
        strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _exchange: ContractIdInput = { value: contractId };
        const _pool: ContractIdInput = { value: pool.id.toB256() };
        const _asset: AssetIdInput = { value: assetId };

        const _collection = new Contract(order.collection, NFTContractAbi__factory.abi, _provider);
        const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);

        const script = new Script(bytecode, abi, wallet);
        const { gasUsed } = await script.functions
            .main(_exchange, _pool, _order, requiredBidAmount, _asset, isUpdate)
            .txParams({gasPrice: 1})
            .callParams({forward: coin})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await script.functions
            .main(_exchange, _pool, _order, requiredBidAmount, _asset, isUpdate)
            .txParams({gasPrice: 1, gasLimit})
            .callParams({forward: coin})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. depositAndOffer failed. Reason: ${err}`)
    }
}

export async function bulkListing(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    orders: MakerOrder[],
    updateOrders?: MakerOrder[],
) {
    let calls: FunctionInvocationScope<any[], any>[] = [];

    const contract = await setup(contractId, provider, wallet);
    const _provider = await Provider.create(provider);
    const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
    const _contracts = [pool, executionManager, assetManager, _contract]

    if (orders.length !== 0) {
        for (const order of orders) {
            if (order.isBuySide) continue;

            const makerOrder = _convertToInput(order);
            const assetId = ReceiptMintCoder.getAssetId(order.collection, makerOrder.token_id);
            const asset: CoinQuantityLike = { amount: order.amount, assetId: assetId };

            let strategy: Contract;
            strategy = strategyFixedPrice
            // order.strategy == strategyFixedPrice.id.toB256() ?
            //     strategy = strategyFixedPrice:
            //     strategy = strategyAuction;

            const _collection = new Contract(makerOrder.collection.value, NFTContractAbi__factory.abi, _provider);
            if (!_contracts.includes(strategy)) _contracts.push(strategy)
            if (!_contracts.includes(_collection)) _contracts.push(_collection)
            const call = contract.functions
                .place_order(makerOrder)
                .txParams({gasPrice: 1})
                .callParams({forward: asset})
                .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            calls.push(call);
        }
    }

    if (updateOrders) {
        for (const order of updateOrders) {
            if (order.isBuySide) continue;

            const makerOrder = _convertToInput(order);

            let strategy: Contract;
            strategy = strategyFixedPrice
            // order.strategy == strategyFixedPrice.id.toB256() ?
            //     strategy = strategyFixedPrice:
            //     strategy = strategyAuction;

            const _collection = new Contract(makerOrder.collection.value, NFTContractAbi__factory.abi, _provider);
            if (!_contracts.includes(strategy)) _contracts.push(strategy)
            if (!_contracts.includes(_collection)) _contracts.push(_collection)
            const call = contract.functions
                .update_order(makerOrder)
                .txParams({gasPrice: 1})
                .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            calls.push(call);
        }
    }

    if (calls.length === 0) return null;

    const { gasUsed } = await contract.multiCall(calls)
        .txParams({gasPrice: 1})
        .addContracts(_contracts)
        .getTransactionCost();

    const gasLimit = Number(gasUsed) * 1.5

    const { transactionResult } = await contract.multiCall(calls)
        .txParams({gasPrice: 1, gasLimit})
        .addContracts(_contracts)
        .call();
    return { transactionResult };
}

export async function cancelOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    strategy: string,
    nonce: BigNumberish,
    isBuySide: boolean,
) {
    try {
        let side: SideInput;
        isBuySide ?
            side = SideInput.Buy :
            side = SideInput.Sell;
        const _provider = await Provider.create(provider);
        const contract = await setup(contractId, provider, wallet);
        const _strategy: ContractIdInput = { value: strategy };

        let strategyContract: Contract;
        strategyContract = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        if (isBuySide) {
            const { transactionResult } = await contract.functions
                .cancel_order(_strategy, nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({gasPrice: 1})
                .call();
            return { transactionResult };
        }

        const { gasUsed } = await contract.functions
            .cancel_order(_strategy, nonce, side)
            .addContracts([strategyContract, executionManager])
            .txParams({gasPrice: 1, variableOutputs: 1})
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .cancel_order(_strategy, nonce, side)
            .addContracts([strategyContract, executionManager])
            .txParams({gasPrice: 1, variableOutputs: 1, gasLimit})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. cancelOrder failed. Reason: ${err}`)
    }
}

export async function bulkCancelOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    orders: BulkCancelOrderParam[],
) {
    let calls: FunctionInvocationScope<any[], any>[] = [];

    const contract = await setup(contractId, provider, wallet);

    for (const order of orders) {
        let side: SideInput;
        order.isBuySide ?
            side = SideInput.Buy :
            side = SideInput.Sell;

        const _strategy: ContractIdInput = { value: order.strategy };

        let strategyContract: Contract;
        strategyContract = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        if (order.isBuySide) {
            const call = contract.functions
                .cancel_order(_strategy, order.nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({gasPrice: 1})
            calls.push(call)
        } else {
            const call = contract.functions
                .cancel_order(_strategy, order.nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({gasPrice: 1, variableOutputs: 1})
            calls.push(call)
        }
    }

    if (calls.length === 0) return null;

    const { gasUsed } = await contract.multiCall(calls)
        .txParams({gasPrice: 1})
        .addContracts([strategyFixedPrice, executionManager])
        .getTransactionCost();

    const gasLimit = Number(gasUsed) * 1.5

    const { transactionResult } = await contract.multiCall(calls)
        .txParams({gasPrice: 1, gasLimit})
        .addContracts([strategyFixedPrice, executionManager])
        .call();
    return { transactionResult };
}

export async function executeOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: TakerOrder,
    assetId: string,
) {
    const takerOrder = _convertToTakerOrder(order);

    if (order.isBuySide) {
        const { transactionResult } = await _executeBuyOrder(
            contractId,
            provider,
            wallet,
            takerOrder,
            assetId
        );
        return { transactionResult }
    }

    const { transactionResult } = await _executeSellOrder(
        contractId,
        provider,
        wallet,
        takerOrder,
    );
    return { transactionResult }
}

async function _executeBuyOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: TakerOrderInput,
    assetId: string,
) {
    try {
        const _provider = await Provider.create(provider);
        const contract = await setup(contractId, provider, wallet);
        const coin: CoinQuantityLike = { amount: order.price, assetId: assetId };

        let _strategy: Contract;
        _strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new Contract(order.collection.value, NFTContractAbi__factory.abi, _provider);
        const { gasUsed } = await contract.functions
            .execute_order(order)
            .txParams({gasPrice: 1, variableOutputs: 4})
            .addContracts([_strategy, _collection, royaltyManager, executionManager])
            .callParams({forward: coin})
            .call();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .execute_order(order)
            .txParams({gasPrice: 1, variableOutputs: 4, gasLimit})
            .addContracts([_strategy, _collection, royaltyManager, executionManager])
            .callParams({forward: coin})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. _executeBuyOrder failed. Reason: ${err}`)
    }
}

async function _executeSellOrder(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    order: TakerOrderInput,
) {
    try {
        const _provider = await Provider.create(provider);
        const contract = await setup(contractId, provider, wallet);

        const assetId = ReceiptMintCoder.getAssetId(order.collection.value, order.token_id);
        console.log(assetId)
        const asset: CoinQuantityLike = { amount: 1, assetId: assetId };

        let _strategy: Contract;
        _strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new Contract(order.collection.value, NFTContractAbi__factory.abi, _provider);
        const { gasUsed } = await contract.functions
            .execute_order(order)
            .txParams({gasPrice: 150000, variableOutputs: 4})
            .callParams({forward: asset})
            .addContracts([_strategy, _collection, pool, assetManager, royaltyManager, executionManager])
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.functions
            .execute_order(order)
            .txParams({gasPrice: 150000, variableOutputs: 4, gasLimit})
            .callParams({forward: asset})
            .addContracts([_strategy, _collection, pool, assetManager, royaltyManager, executionManager])
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. _executeSellOrder failed. Reason: ${err}`)
    }
}

export async function bulkPurchase(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    orders: TakerOrder[],
    assetId: string,
) {
    try {
        let calls: FunctionInvocationScope<any[], any>[] = [];

        const contract = await setup(contractId, provider, wallet);
        const _provider = await Provider.create(provider);
        const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
        const _contracts = [pool, executionManager, assetManager, _contract, strategyFixedPrice, royaltyManager]

        for (const order of orders) {
            if (order.isBuySide) {
                const takerOrder = _convertToTakerOrder(order);
                const coin: CoinQuantityLike = { amount: order.price, assetId: assetId };
                const _collection = new Contract(takerOrder.collection.value, NFTContractAbi__factory.abi, _provider);

                //if (order.strategy == strategyAuction.id.toB256()) continue;
                if (!_contracts.includes(_collection)) _contracts.push(_collection)
                const call = contract.functions
                    .execute_order(takerOrder)
                    .txParams({gasPrice: 1, variableOutputs: 4})
                    .addContracts([strategyFixedPrice, _collection, royaltyManager, executionManager])
                    .callParams({forward: coin})
                calls.push(call);
            }
        }

        if (calls.length === 0) return null;

        const { gasUsed } = await contract.multiCall(calls)
            .txParams({gasPrice: 1})
            .addContracts(_contracts)
            .getTransactionCost();

        const gasLimit = Number(gasUsed) * 1.5

        const { transactionResult } = await contract.multiCall(calls)
            .txParams({gasPrice: 1, gasLimit})
            .addContracts(_contracts)
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setPool failed. Reason: ${err}`)
    }
}

export async function setPool(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    pool: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _pool: ContractIdInput = { value: pool };
        const { transactionResult } = await contract.functions
            .set_pool(_pool)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setPool failed. Reason: ${err}`)
    }
}

export async function setExecutionManager(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    executionManager: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _executionManager: ContractIdInput = { value: executionManager };
        const { transactionResult } = await contract.functions
            .set_execution_manager(_executionManager)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setExecutionManager failed. Reason: ${err}`)
    }
}

export async function setRoyaltyManager(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    royaltyManager: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _royaltyManager: ContractIdInput = { value: royaltyManager };
        const { transactionResult } = await contract.functions
            .set_royalty_manager(_royaltyManager)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setRoyaltyManager failed. Reason: ${err}`)
    }
}

export async function setAssetManager(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    assetManager: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _assetManager: ContractIdInput = { value: assetManager };
        const { transactionResult } = await contract.functions
            .set_asset_manager(_assetManager)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setAssetManager failed. Reason: ${err}`)
    }
}

export async function setProtocolFeeRecipient(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    protocolFeeRecipient: string,
    isRecipientAddress: boolean,
) {
    try {
        let _protocolFeeRecipient: IdentityInput;
        isRecipientAddress ?
            _protocolFeeRecipient = { Address: { value: protocolFeeRecipient } } :
            _protocolFeeRecipient = { ContractId: { value: protocolFeeRecipient } };
        const contract = await setup(contractId, provider, wallet);
        const { transactionResult } = await contract.functions
            .set_protocol_fee_recipient(_protocolFeeRecipient)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. setProtocolFeeRecipient failed. Reason: ${err}`)
    }
}

export async function getPool(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_pool()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function getExecutionManager(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_execution_manager()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function getRoyaltyManager(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_royalty_manager()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function getAssetManager(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_asset_manager()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function getProtocolFeeRecipient(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_protocol_fee_recipient()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function owner(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .owner()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Exchange: " + err);
        return { err };
    }
}

export async function transferOwnership(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    newOwner: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _newOwner: IdentityInput = { Address: { value: newOwner } };
        const { transactionResult } = await contract.functions
            .transfer_ownership(_newOwner)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. transferOwnership failed. Reason: ${err}`)
    }
}

export async function renounceOwnership(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { transactionResult } = await contract.functions
            .renounce_ownership()
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. renounceOwnership failed. Reason: ${err}`)
    }
}
