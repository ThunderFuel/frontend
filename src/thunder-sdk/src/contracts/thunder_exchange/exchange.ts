import {
    type FunctionInvocationScope,
    Provider,
    WalletUnlocked,
    type WalletLocked,
    type CoinQuantityLike,
    type Contract,
    type BigNumberish,
    Script,
    getMintedAssetId,
    type TransactionResult,
    type TransactionType
} from "fuels";
import { ThunderExchange } from "../../types/thunder_exchange";
import { StrategyFixedPriceSale } from "../../types/execution_strategies/strategy_fixed_price_sale";
import { Pool, } from "../../types/pool/";
import { ExecutionManager } from "../../types/execution_manager";
import { RoyaltyManager } from "../../types/royalty_manager";
import { AssetManager } from "../../types/asset_manager";
import { NFTContract } from "../../types/erc721";
import { type IdentityInput,
    type ContractIdInput,
    type MakerOrderInput,
    SideInput,
    type TakerOrderInput,
    type ExtraParamsInput,
    type AssetIdInput
} from "../../types/thunder_exchange/ThunderExchange";

import bytecode from "../../scripts/deposit_and_offer/binFile";
import abi from "../../scripts/deposit_and_offer/out/deposit_and_offer-abi.json";

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
    pool = new Pool(contracts.pool, provider);
    executionManager = new ExecutionManager(contracts.executionManager, provider);
    royaltyManager = new RoyaltyManager(contracts.royaltyManager, provider);
    assetManager = new AssetManager(contracts.assetManager, provider);
    strategyFixedPrice = new StrategyFixedPriceSale(contracts.strategyFixedPrice, provider);
}

function _convertToInput(makerOrder: MakerOrder): MakerOrderInput {
    const zeroX = "0x";
    const fill0 = makerOrder.token_id.toString().padStart(64, "0")
    const subId = fill0.padStart(66, zeroX)

    const extraParams: ExtraParamsInput = {
        extra_address_param: { bits: makerOrder.extra_params.extra_address_param },
        extra_contract_param: { bits: makerOrder.extra_params.extra_contract_param },
        extra_u64_param: makerOrder.extra_params.extra_u64_param,
    };

    const output: MakerOrderInput = {
        side: makerOrder.isBuySide ? SideInput.Buy : SideInput.Sell,
        maker: { bits: makerOrder.maker },
        collection: { bits: makerOrder.collection },
        token_id: subId,
        price: makerOrder.price,
        amount: makerOrder.amount,
        nonce: makerOrder.nonce,
        strategy: { bits: makerOrder.strategy },
        payment_asset: { bits: makerOrder.payment_asset },
        extra_params: extraParams,
    }

    return output
}

function _convertToTakerOrder(takerOrder: TakerOrder): TakerOrderInput {
    const zeroX = "0x";
    const fill0 = takerOrder.token_id.toString().padStart(64, "0")
    const subId = fill0.padStart(66, zeroX)

    const extraParams: ExtraParamsInput = {
        extra_address_param: { bits: takerOrder.extra_params.extra_address_param },
        extra_contract_param: { bits: takerOrder.extra_params.extra_contract_param },
        extra_u64_param: takerOrder.extra_params.extra_u64_param,
    };

    const output: TakerOrderInput = {
        side: takerOrder.isBuySide ? SideInput.Buy : SideInput.Sell,
        taker: { bits: takerOrder.taker },
        maker: { bits: takerOrder.maker },
        collection: { bits: takerOrder.collection },
        token_id: subId,
        price: takerOrder.price,
        nonce: takerOrder.nonce,
        strategy: { bits: takerOrder.strategy },
        extra_params: extraParams,
    }

    return output
}

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<ThunderExchange> {
    const _provider = await Provider.create(provider);

    if (wallet) {
        if ( typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return new ThunderExchange(contractId, walletUnlocked)
        }
            return new ThunderExchange(contractId, wallet)
    }

    return new ThunderExchange(contractId, _provider)
}

async function poolSetup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<Pool> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return new Pool(contractId, walletUnlocked)
    } else if (wallet && typeof wallet !== "string") {
        return new Pool(contractId, wallet)
    }

    return new Pool(contractId, _provider)
}

async function erc721Setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<NFTContract> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return new NFTContract(contractId, walletUnlocked)
    } else if (wallet && typeof wallet !== "string") {
        return new NFTContract(contractId, wallet)
    }

    return new NFTContract(contractId, _provider)
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const call = await contract.functions
            .initialize()
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const assetId = getMintedAssetId(order.collection, _order.token_id);
        const asset: CoinQuantityLike = { amount: order.amount, assetId: assetId };

        let strategy: Contract;
        strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new NFTContract(order.collection, _provider);
        const _contract = new ThunderExchange(contract.id, _provider);

        // const { gasUsed } = await contract.functions
        //     .place_order(_order)
        //     .txParams({})
        //     .callParams({forward: asset})
        //     .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .place_order(_order)
            .txParams({})
            .callParams({forward: asset})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const _collection = new NFTContract(order.collection, _provider);
        const _contract = new ThunderExchange(contract.id, _provider);

        // const { gasUsed } = await contract.functions
        //     .place_order(_order)
        //     .txParams({})
        //     .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .place_order(_order)
            .txParams({})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const _collection = new NFTContract(order.collection, _provider);
        const _contract = new ThunderExchange(contract.id, _provider);

        // const { gasUsed } = await contract.functions
        //     .update_order(_order)
        //     .txParams({})
        //     .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .update_order(_order)
            .txParams({})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const _exchange: ContractIdInput = { bits: contractId };
        const _pool: ContractIdInput = { bits: pool.id.toB256() };
        const _asset: AssetIdInput = { bits: assetId };

        const _collection = new NFTContract(order.collection, _provider);
        const _contract = new ThunderExchange(contract.id, _provider);

        const script = new Script(bytecode, abi, wallet);

        // const { gasUsed } = await script.functions
        //     .main(_exchange, _pool, _order, requiredBidAmount, _asset, isUpdate)
        //     .txParams({})
        //     .callParams({forward: coin})
        //     .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await script.functions
            .main(_exchange, _pool, _order, requiredBidAmount, _asset, isUpdate)
            .txParams({})
            .callParams({forward: coin})
            .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            .call();
        const { transactionResult } = await call.waitForResult()
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
    const _contract = new ThunderExchange(contract.id, _provider);
    const _contracts = [pool, executionManager, assetManager, _contract]

    if (orders.length !== 0) {
        for (const order of orders) {
            if (order.isBuySide) continue;

            const makerOrder = _convertToInput(order);
            const assetId = getMintedAssetId(order.collection, makerOrder.token_id);
            const asset: CoinQuantityLike = { amount: order.amount, assetId: assetId };

            let strategy: Contract;
            strategy = strategyFixedPrice
            // order.strategy == strategyFixedPrice.id.toB256() ?
            //     strategy = strategyFixedPrice:
            //     strategy = strategyAuction;

            const _collection = new NFTContract(makerOrder.collection.bits, _provider);
            if (!_contracts.includes(strategy)) _contracts.push(strategy)
            if (!_contracts.includes(_collection)) _contracts.push(_collection)
            const call = contract.functions
                .place_order(makerOrder)
                .txParams({})
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

            const _collection = new NFTContract(makerOrder.collection.bits, _provider);
            if (!_contracts.includes(strategy)) _contracts.push(strategy)
            if (!_contracts.includes(_collection)) _contracts.push(_collection)
            const call = contract.functions
                .update_order(makerOrder)
                .txParams({})
                .addContracts([strategy, pool, executionManager, assetManager, _collection, _contract])
            calls.push(call);
        }
    }

    if (calls.length === 0) return null;

    // const { gasUsed } = await contract.multiCall(calls)
    //     .txParams({})
    //     .addContracts(_contracts)
    //     .getTransactionCost();

    // const gasLimit = Number(gasUsed) * 1.5

    const call = await contract.multiCall(calls)
        .txParams({})
        .addContracts(_contracts)
        .call();
    const { transactionResult } = await call.waitForResult()
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
        const _strategy: ContractIdInput = { bits: strategy };

        let strategyContract: Contract;
        strategyContract = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        if (isBuySide) {
            // const { gasUsed } = await contract.functions
            //     .cancel_order(_strategy, nonce, side)
            //     .addContracts([strategyContract, executionManager])
            //     .txParams({})
            //     .getTransactionCost();

            // const gasLimit = Number(gasUsed) * 1.5

            const call = await contract.functions
                .cancel_order(_strategy, nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({})
                .call();
            const { transactionResult } = await call.waitForResult()
            return { transactionResult };
        }

        // const { gasUsed } = await contract.functions
        //     .cancel_order(_strategy, nonce, side)
        //     .addContracts([strategyContract, executionManager])
        //     .txParams({variableOutputs: 1})
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .cancel_order(_strategy, nonce, side)
            .addContracts([strategyContract, executionManager])
            .txParams({variableOutputs: 1})
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const _strategy: ContractIdInput = { bits: order.strategy };

        let strategyContract: Contract;
        strategyContract = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        if (order.isBuySide) {
            const call = contract.functions
                .cancel_order(_strategy, order.nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({})
            calls.push(call)
        } else {
            const call = contract.functions
                .cancel_order(_strategy, order.nonce, side)
                .addContracts([strategyContract, executionManager])
                .txParams({variableOutputs: 1})
            calls.push(call)
        }
    }

    if (calls.length === 0) return null;

    // const { gasUsed } = await contract.multiCall(calls)
    //     .txParams({})
    //     .addContracts([strategyFixedPrice, executionManager])
    //     .getTransactionCost();

    // const gasLimit = Number(gasUsed) * 1.5

    const call = await contract.multiCall(calls)
        .txParams({})
        .addContracts([strategyFixedPrice, executionManager])
        .call();
    const { transactionResult } = await call.waitForResult()
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

        const _collection = new NFTContract(order.collection.bits, _provider);

        // const { gasUsed } = await contract.functions
        //     .execute_order(order)
        //     .txParams({variableOutputs: 4})
        //     .addContracts([_strategy, _collection, royaltyManager, executionManager])
        //     .callParams({forward: coin})
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .execute_order(order)
            .txParams({variableOutputs: 4})
            .addContracts([_strategy, _collection, royaltyManager, executionManager])
            .callParams({forward: coin})
            .call();
        const { transactionResult } = await call.waitForResult()
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

        const assetId = getMintedAssetId(order.collection.bits, order.token_id);
        console.log(assetId)
        const asset: CoinQuantityLike = { amount: 1, assetId: assetId };

        let _strategy: Contract;
        _strategy = strategyFixedPrice
        // order.strategy == strategyFixedPrice.id.toB256() ?
        //     strategy = strategyFixedPrice:
        //     strategy = strategyAuction;

        const _collection = new NFTContract(order.collection.bits, _provider);

        // const { gasUsed } = await contract.functions
        //     .execute_order(order)
        //     .txParams({variableOutputs: 4})
        //     .callParams({forward: asset})
        //     .addContracts([_strategy, _collection, pool, assetManager, royaltyManager, executionManager])
        //     .getTransactionCost();

        // const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .execute_order(order)
            .txParams({variableOutputs: 4})
            .callParams({forward: asset})
            .addContracts([_strategy, _collection, pool, assetManager, royaltyManager, executionManager])
            .call();
        const { transactionResult } = await call.waitForResult()
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
      const contract = await setup(contractId, provider, wallet);
      const _provider = await Provider.create(provider);
      const _contracts: Contract[] = [pool, executionManager, assetManager, strategyFixedPrice, royaltyManager];

      const calls: FunctionInvocationScope<any[], any>[] = [];

      for (const order of orders) {
        if (!order.isBuySide || order.nonce === 0) continue;

        const takerOrderInput = _convertToTakerOrder(order);
        const coin: CoinQuantityLike = { amount: order.price, assetId: assetId };
        const _collection = new NFTContract(order.collection, _provider);

        if (!_contracts.some(contract => contract.id === _collection.id)) {
          _contracts.push(_collection);
        }

        const call = contract.functions
          .execute_order(takerOrderInput)
          .txParams({ variableOutputs: 4 })
          .addContracts([strategyFixedPrice, pool, executionManager, assetManager, _collection, royaltyManager])
          .callParams({ forward: coin });

        calls.push(call);
      }


      // Disabled gas limit estimation to speed up the process
    // //   Estimate gas for the batched transaction
    //   const { gasUsed } = await contract.multiCall(calls)
    //     .txParams({})
    //     .addContracts(_contracts)
    //     .getTransactionCost();

    //   const gasLimit = Math.floor(Number(gasUsed) * 1.5);

    //   Execute the batch transaction
      const result = await contract.multiCall(calls)
        .txParams({})
        .addContracts(_contracts)
        .call();

      const { transactionResult } = await result.waitForResult();
      return { transactionResult };
    } catch (err: any) {
      console.error("Exchange.bulkPurchase failed:", err);
      throw Error(`Exchange.bulkPurchase failed. Reason: ${err.message || err}`);
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
        const _pool: ContractIdInput = { bits: pool };
        const call = await contract.functions
            .set_pool(_pool)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
        const _executionManager: ContractIdInput = { bits: executionManager };
        const call = await contract.functions
            .set_execution_manager(_executionManager)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
        const _royaltyManager: ContractIdInput = { bits: royaltyManager };
        const call = await contract.functions
            .set_royalty_manager(_royaltyManager)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
        const _assetManager: ContractIdInput = { bits: assetManager };
        const call = await contract.functions
            .set_asset_manager(_assetManager)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
            _protocolFeeRecipient = { Address: { bits: protocolFeeRecipient } } :
            _protocolFeeRecipient = { ContractId: { bits: protocolFeeRecipient } };
        const contract = await setup(contractId, provider, wallet);
        const call = await contract.functions
            .set_protocol_fee_recipient(_protocolFeeRecipient)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
        const _newOwner: IdentityInput = { Address: { bits: newOwner } };
        const call = await contract.functions
            .transfer_ownership(_newOwner)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
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
        const call = await contract.functions
            .renounce_ownership()
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Exchange. renounceOwnership failed. Reason: ${err}`)
    }
}
