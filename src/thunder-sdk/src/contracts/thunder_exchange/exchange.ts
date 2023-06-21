import { Provider, WalletUnlocked, WalletLocked, CoinQuantityLike, Contract, BigNumberish, FunctionInvocationScope, Script } from "fuels";
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale/factories/StrategyFixedPriceSaleAbi__factory";
import { StrategyAuctionAbi__factory } from "../../types/execution_strategies/strategy_auction/factories/StrategyAuctionAbi__factory";
import { PoolAbi__factory } from "../../types/pool/factories/PoolAbi__factory";
import { PoolAbi } from "../../types/pool/PoolAbi";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import { TransferSelectorAbi__factory } from "../../types/transfer_selector/factories/TransferSelectorAbi__factory";
import { TransferManagerAbi__factory } from "../../types/transfer_manager/factories/TransferManagerAbi__factory";
import { NFTAbi__factory } from "../../types/erc721/factories/NFTAbi__factory";
import { ThunderExchangeAbi, IdentityInput, ContractIdInput, MakerOrderInputInput, SideInput, TakerOrderInput, ExtraParamsInput } from "../../types/thunder_exchange/ThunderExchangeAbi";
import { Option } from "../../types/thunder_exchange/common";

import bytecode from "../../scripts/bulk_place_order/binFile";
import bytecode2 from "../../scripts/approve_and_execute_order/binFile";
import abi from "../../scripts/bulk_place_order/out/bulk_place_order-abi.json";
import abi2 from "../../scripts/approve_and_execute_order/out/approve_and_execute_order-abi.json";
import { NFTAbi } from "../../types/erc721";

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
};

export type TakerOrder = {
  isBuySide: boolean;
  taker: string;
  maker: string;
  nonce: BigNumberish;
  price: BigNumberish;
  token_id: BigNumberish;
  collection: string;
  strategy: string;
  extra_params: ExtraParams;
};

export type ExtraParams = {
  extra_address_param: string;
  extra_contract_param: string;
  extra_u64_param: BigNumberish;
};

export type Contracts = {
  pool: string;
  executionManager: string;
  transferSelector: string;
  royaltyManager: string;
  assetManager: string;
  transferManager: string;
  strategyFixedPrice: string;
  strategyAuction: string;
};

let pool: Contract;
let executionManager: Contract;
let transferSelector: Contract;
let royaltyManager: Contract;
let assetManager: Contract;
let transferManager: Contract;
let strategyFixedPrice: Contract;
let strategyAuction: Contract;

export function setContracts(contracts: Contracts, provider: Provider) {
  pool = new Contract(contracts.pool, PoolAbi__factory.abi, provider);
  executionManager = new Contract(contracts.executionManager, ExecutionManagerAbi__factory.abi, provider);
  transferSelector = new Contract(contracts.transferSelector, TransferSelectorAbi__factory.abi, provider);
  royaltyManager = new Contract(contracts.royaltyManager, RoyaltyManagerAbi__factory.abi, provider);
  assetManager = new Contract(contracts.assetManager, AssetManagerAbi__factory.abi, provider);
  transferManager = new Contract(contracts.transferManager, TransferManagerAbi__factory.abi, provider);
  strategyFixedPrice = new Contract(contracts.strategyFixedPrice, StrategyFixedPriceSaleAbi__factory.abi, provider);
  strategyAuction = new Contract(contracts.strategyAuction, StrategyAuctionAbi__factory.abi, provider);
}

function _convertToInput(makerOrder: MakerOrder): MakerOrderInputInput {
  const extraParams: ExtraParamsInput = {
    extra_address_param: { value: makerOrder.extra_params.extra_address_param },
    extra_contract_param: { value: makerOrder.extra_params.extra_contract_param },
    extra_u64_param: makerOrder.extra_params.extra_u64_param,
  };

  const output: MakerOrderInputInput = {
    side: makerOrder.isBuySide ? { Buy: [] } : { Sell: [] },
    maker: { value: makerOrder.maker },
    collection: { value: makerOrder.collection },
    token_id: makerOrder.token_id,
    price: makerOrder.price,
    amount: makerOrder.amount,
    nonce: makerOrder.nonce,
    strategy: { value: makerOrder.strategy },
    payment_asset: { value: makerOrder.payment_asset },
    expiration_range: makerOrder.expiration_range,
    extra_params: extraParams,
  };

  return output;
}

function _convertToTakerOrder(takerOrder: TakerOrder): TakerOrderInput {
  const extraParams: ExtraParamsInput = {
    extra_address_param: { value: takerOrder.extra_params.extra_address_param },
    extra_contract_param: { value: takerOrder.extra_params.extra_contract_param },
    extra_u64_param: takerOrder.extra_params.extra_u64_param,
  };

  const output: TakerOrderInput = {
    side: takerOrder.isBuySide ? { Buy: [] } : { Sell: [] },
    taker: { value: takerOrder.taker },
    maker: { value: takerOrder.maker },
    collection: { value: takerOrder.collection },
    token_id: takerOrder.token_id,
    price: takerOrder.price,
    nonce: takerOrder.nonce,
    strategy: { value: takerOrder.strategy },
    extra_params: extraParams,
  };

  return output;
}

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<ThunderExchangeAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return ThunderExchangeAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return ThunderExchangeAbi__factory.connect(contractId, wallet);
  }

  return ThunderExchangeAbi__factory.connect(contractId, _provider);
}

async function poolSetup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<PoolAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return PoolAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return PoolAbi__factory.connect(contractId, wallet);
  }

  return PoolAbi__factory.connect(contractId, _provider);
}

async function erc721Setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<NFTAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return NFTAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return NFTAbi__factory.connect(contractId, wallet);
  }

  return NFTAbi__factory.connect(contractId, _provider);
}

export async function initialize(contractId: string, provider: string, wallet: string | WalletLocked) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.initialize().txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. initialize failed. Reason: ${err}`);
  }
}

export async function placeOrder(contractId: string, provider: string, wallet: string | WalletLocked, order: MakerOrder) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _provider = new Provider(provider);
    const _order = _convertToInput(order);

    let strategy: Contract;
    order.strategy == strategyFixedPrice.id.toB256() ? (strategy = strategyFixedPrice) : (strategy = strategyAuction);

    const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
    const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
    const { transactionResult, transactionResponse } = await contract.functions
      .place_order(_order)
      .txParams({ gasPrice: 1 })
      .addContracts([strategy, pool, executionManager, assetManager, _collection, transferSelector, _contract])
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. placeOrder failed. Reason: ${err}`);
  }
}

export async function depositAndPlaceOrder(contractId: string, provider: string, wallet: string | WalletLocked, order: MakerOrder, requiredBidAmount: BigNumberish, assetId: string) {
  if (!order.isBuySide) throw Error("only buy side");
  try {
    const contract = await setup(contractId, provider, wallet);
    const coin: CoinQuantityLike = { amount: requiredBidAmount, assetId: assetId };
    const _provider = new Provider(provider);
    const _order = _convertToInput(order);

    let strategy: Contract;
    order.strategy == strategyFixedPrice.id.toB256() ? (strategy = strategyFixedPrice) : (strategy = strategyAuction);

    const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
    const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);

    const _pool = await poolSetup(pool.id.toB256(), provider, wallet);
    const depositCall = _pool.functions.deposit().txParams({ gasPrice: 1 }).addContracts([assetManager]).callParams({ forward: coin });

    const placeOrderCall = contract.functions.place_order(_order).txParams({ gasPrice: 1 }).addContracts([strategy, pool, executionManager, assetManager, _collection, transferSelector, _contract]);

    const { transactionResult, transactionResponse } = await contract
      .multiCall([depositCall, placeOrderCall])
      .addContracts([strategy, pool, executionManager, assetManager, _collection, transferSelector, _contract])
      .txParams({ gasPrice: 1 })
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. depositAndPlaceOrder failed. Reason: ${err}`);
  }
}

export async function bulkListing(contractId: string, provider: string, wallet: string | WalletLocked, orders: MakerOrder[]) {
  let calls: FunctionInvocationScope<any[], any>[] = [];
  const contract = await setup(contractId, provider, wallet);
  const _provider = new Provider(provider);
  const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
  const _contracts = [pool, executionManager, assetManager, transferSelector, _contract];
  for (const order of orders) {
    const makerOrder = _convertToInput(order);

    let strategy: Contract;
    order.strategy == strategyFixedPrice.id.toB256() ? (strategy = strategyFixedPrice) : (strategy = strategyAuction);

    const _collection = new Contract(makerOrder.collection.value, NFTAbi__factory.abi, _provider);
    if (!_contracts.includes(strategy)) _contracts.push(strategy);
    if (!_contracts.includes(_collection)) _contracts.push(_collection);
    const call = contract.functions.place_order(makerOrder).txParams({ gasPrice: 1 }).addContracts([strategy, pool, executionManager, assetManager, _collection, transferSelector, _contract]);
    calls.push(call);
  }

  if (calls.length === 0) return null;

  const { transactionResponse, transactionResult } = await contract.multiCall(calls).txParams({ gasPrice: 1 }).addContracts(_contracts).call();
  return { transactionResponse, transactionResult };
}

// Method uses Fuel Script. Can be used for `listing`, `bulk listing` and `open auction`
export async function bulkPlaceOrder(contractId: string, provider: string, wallet: WalletLocked | WalletUnlocked, transferManager: string, orders: MakerOrder[]) {
  const maxLimit = 50;

  if (orders.length > maxLimit) throw Error("Orders length exceeds the limit");
  if (orders.length == 0) throw Error("Empty array");

  try {
    const script = new Script(bytecode, abi, wallet);
    const _provider = new Provider(provider);
    const _exchange: ContractIdInput = { value: contractId };
    const _transferManager: ContractIdInput = { value: transferManager };
    const _contract = new Contract(contractId, ThunderExchangeAbi__factory.abi, _provider);

    const _contracts = [pool, executionManager, assetManager, transferSelector, _contract];
    const _orders: Option<MakerOrderInputInput>[] = [];

    for (let order of orders) {
      const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
      const _order = _convertToInput(order);

      let strategy: Contract;
      order.strategy == strategyFixedPrice.id.toB256() ? (strategy = strategyFixedPrice) : (strategy = strategyAuction);

      if (!_contracts.includes(strategy)) _contracts.push(strategy);
      if (!_contracts.includes(_collection)) _contracts.push(_collection);
      _orders.push(_order);
    }

    const optionUndefined: Option<MakerOrderInputInput> = undefined;
    if (_orders.length < maxLimit) {
      for (let i = _orders.length + 1; i <= maxLimit; i++) {
        _orders.push(optionUndefined);
      }
    }
    if (_orders.length > maxLimit) throw Error("Orders length exceeds the limit");
    if (_orders.length == 0) throw Error("Empty array");
    if (_orders[0] == optionUndefined) throw Error("undefined at the first index");

    const { transactionResult, transactionResponse } = await script.functions.main(_exchange, _transferManager, _orders).txParams({ gasPrice: 1 }).addContracts(_contracts).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. bulkPlaceOrder failed. Reason: ${err}`);
  }
}

// export async function bulkPlaceOrder(
//     contractId: string,
//     provider: string,
//     wallet: string | WalletLocked,
//     orders: MakerOrder[],
// ) {
//     try {
//         const contract = await setup(contractId, provider, wallet);
//         const _provider = new Provider(provider);

//         const _orders = []
//         const _contracts: Contract[] = [pool, executionManager, assetManager, transferSelector]
//         for(const order of orders) {
//             const _order = _convertToInput(order);

//             let strategy: Contract;
//             order.strategy == strategyFixedPrice.id.toB256() ?
//                 strategy = strategyFixedPrice:
//                 strategy = strategyAuction;

//             const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
//             if (!_contracts.includes(strategy)) _contracts.push(strategy)
//             if (!_contracts.includes(_collection)) _contracts.push(_collection)
//             _orders.push(_order)
//         }

//         const { transactionResult, transactionResponse } = await contract.functions
//             .bulk_place_order(_orders)
//             .txParams({gasPrice: 1})
//             .addContracts(_contracts)
//             .call();
//         return { transactionResponse, transactionResult };
//     } catch(err: any) {
//         throw Error(`Exchange. bulkPlaceOrder failed. Reason: ${err}`)
//     }
// }

export async function cancelOrder(contractId: string, provider: string, wallet: string | WalletLocked, strategy: string, nonce: BigNumberish, isBuySide: boolean) {
  try {
    let side: SideInput;
    isBuySide ? (side = { Buy: [] }) : (side = { Sell: [] });
    const _provider = new Provider(provider);
    const contract = await setup(contractId, provider, wallet);
    const _strategy: ContractIdInput = { value: strategy };

    let strategyContract: Contract;
    strategy == strategyFixedPrice.id.toB256() ? (strategyContract = strategyFixedPrice) : (strategyContract = strategyAuction);

    const { transactionResult, transactionResponse } = await contract.functions
      .cancel_order(_strategy, nonce, side)
      .addContracts([strategyContract, executionManager])
      .txParams({ gasPrice: 1 })
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. cancelOrder failed. Reason: ${err}`);
  }
}

export async function cancelAllOrders(contractId: string, provider: string, wallet: string | WalletLocked, strategy: string) {
  try {
    const contract = await setup(contractId, provider, wallet);

    let _strategy: Contract;
    strategy == strategyFixedPrice.id.toB256() ? (_strategy = strategyFixedPrice) : (_strategy = strategyAuction);

    const { transactionResult, transactionResponse } = await contract.functions.cancel_all_orders({ value: _strategy.id.toB256() }).txParams({ gasPrice: 1 }).addContracts([_strategy]).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. cancelAllOrders failed. Reason: ${err}`);
  }
}

export async function cancelAllOrdersBySide(contractId: string, provider: string, wallet: string | WalletLocked, strategy: string, isBuySide: boolean) {
  try {
    let side: SideInput;
    isBuySide ? (side = { Buy: [] }) : (side = { Sell: [] });
    const contract = await setup(contractId, provider, wallet);

    let _strategy: Contract;
    strategy == strategyFixedPrice.id.toB256() ? (_strategy = strategyFixedPrice) : (_strategy = strategyAuction);

    const { transactionResult, transactionResponse } = await contract.functions
      .cancel_all_orders_by_side({ value: _strategy.id.toB256() }, side)
      .txParams({ gasPrice: 1 })
      .addContracts([_strategy])
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. cancelAllOrdersBySide failed. Reason: ${err}`);
  }
}

export async function executeOrder(contractId: string, provider: string, wallet: string | WalletLocked, order: TakerOrder, assetId: string) {
  const takerOrder = _convertToTakerOrder(order);
  if (order.isBuySide) {
    const { transactionResult, transactionResponse } = await _executeBuyOrder(contractId, provider, wallet, takerOrder, assetId);
    return { transactionResult, transactionResponse };
  }
  const { transactionResult, transactionResponse } = await _executeSellOrder(contractId, provider, wallet, takerOrder);
  return { transactionResult, transactionResponse };
}

async function _executeBuyOrder(contractId: string, provider: string, wallet: string | WalletLocked, order: TakerOrderInput, assetId: string) {
  try {
    const _provider = new Provider(provider);
    const contract = await setup(contractId, provider, wallet);
    const coin: CoinQuantityLike = { amount: order.price, assetId: assetId };

    let _strategy: Contract;
    order.strategy.value == strategyFixedPrice.id.toB256() ? (_strategy = strategyFixedPrice) : (_strategy = strategyAuction);

    const _collection = new Contract(order.collection.value, NFTAbi__factory.abi, _provider);
    const { transactionResult, transactionResponse } = await contract.functions
      .execute_order(order)
      .txParams({ gasPrice: 1, variableOutputs: 3 })
      .addContracts([_strategy, _collection, royaltyManager, executionManager, transferSelector, transferManager])
      .callParams({ forward: coin })
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. _executeBuyOrder failed. Reason: ${err}`);
  }
}

async function _executeSellOrder(contractId: string, provider: string, wallet: string | WalletLocked, order: TakerOrderInput) {
  try {
    const _provider = new Provider(provider);
    const contract = await setup(contractId, provider, wallet);

    let _strategy: Contract;
    order.strategy.value == strategyFixedPrice.id.toB256() ? (_strategy = strategyFixedPrice) : (_strategy = strategyAuction);

    const _collection = new Contract(order.collection.value, NFTAbi__factory.abi, _provider);
    const { transactionResult, transactionResponse } = await contract.functions
      .execute_order(order)
      .txParams({ gasPrice: 1, variableOutputs: 3 })
      .addContracts([_strategy, _collection, pool, assetManager, royaltyManager, executionManager, transferSelector, transferManager])
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. _executeSellOrder failed. Reason: ${err}`);
  }
}

export async function approveAndAcceptOffer(contractId: string, provider: string, wallet: string | WalletLocked, order: TakerOrder, transferManagerContractId: string) {
  if (order.isBuySide) throw Error("only sell side");
  if (order.strategy != strategyFixedPrice.id.toB256()) throw Error("only fixed price strategy");

  try {
    const contract = await setup(contractId, provider, wallet);
    const strategy: Contract = strategyFixedPrice;

    const _provider = new Provider(provider);
    const _order = _convertToTakerOrder(order);
    const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
    const _erc721 = await erc721Setup(order.collection, provider, wallet);

    const operator: IdentityInput = { ContractId: { value: transferManagerContractId } };
    const approvalCall = _erc721.functions.set_approval_for_all(true, operator).txParams({ gasPrice: 1 });

    const executeOrderCall = contract.functions
      .execute_order(_order)
      .txParams({ gasPrice: 1, variableOutputs: 3 })
      .addContracts([strategy, _collection, pool, assetManager, royaltyManager, executionManager, transferSelector, transferManager]);

    const { transactionResult, transactionResponse } = await contract
      .multiCall([approvalCall, executeOrderCall])
      .addContracts([strategy, _collection, pool, assetManager, royaltyManager, executionManager, transferSelector, transferManager])
      .txParams({ gasPrice: 1 })
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. approveAndAcceptOffer failed. Reason: ${err}`);
  }
}

export async function approveAndExecuteOrder(contractId: string, provider: string, wallet: WalletLocked, order: TakerOrder, transferManagerContractId: string) {
  if (order.isBuySide) throw Error("only sell side");
  if (order.strategy != strategyFixedPrice.id.toB256()) throw Error("only fixed price strategy");

  try {
    const script = new Script(bytecode2, abi2, wallet);
    const _provider = new Provider(provider);
    const _exchange: ContractIdInput = { value: contractId };
    const _transferManager: ContractIdInput = { value: transferManagerContractId };
    const _collection = new Contract(order.collection, NFTAbi__factory.abi, _provider);
    const _contract = new Contract(contractId, ThunderExchangeAbi__factory.abi, _provider);

    const _takerOrder = _convertToTakerOrder(order);
    const { transactionResult, transactionResponse } = await script.functions
      .main(_exchange, _transferManager, _takerOrder)
      .txParams({ gasPrice: 1, variableOutputs: 3 })
      .addContracts([_collection, _contract, strategyFixedPrice, pool, assetManager, royaltyManager, executionManager, transferSelector, transferManager])
      .call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. approveAndexecuteOrder failed. Reason: ${err}`);
  }
}

export async function bulkPurchase(contractId: string, provider: string, wallet: string | WalletLocked, orders: TakerOrder[], assetId: string) {
  try {
    let calls: FunctionInvocationScope<any[], any>[] = [];
    const contract = await setup(contractId, provider, wallet);
    const _provider = new Provider(provider);
    const _contract = new Contract(contract.id, ThunderExchangeAbi__factory.abi, _provider);
    const _contracts = [pool, executionManager, assetManager, transferSelector, _contract, strategyFixedPrice, royaltyManager, transferManager];
    console.log("1");
    for (const order of orders) {
      console.log("2");

      if (order.isBuySide) {
        console.log("3");

        const takerOrder = _convertToTakerOrder(order);
        const coin: CoinQuantityLike = { amount: order.price, assetId: assetId };
        const _collection = new Contract(takerOrder.collection.value, NFTAbi__factory.abi, _provider);
        console.log("4");

        if (order.strategy == strategyAuction.id.toB256()) continue;
        console.log("5");

        if (!_contracts.includes(_collection)) _contracts.push(_collection);
        console.log("6");

        const call = contract.functions
          .execute_order(takerOrder)
          .txParams({ gasPrice: 1, variableOutputs: 3 })
          .addContracts([strategyFixedPrice, _collection, royaltyManager, executionManager, transferSelector, transferManager])
          .callParams({ forward: coin });
        calls.push(call);
        console.log("7");
      }
    }
    console.log("8");

    if (calls.length === 0) return null;
    console.log("9");

    const { transactionResponse, transactionResult } = await contract.multiCall(calls).txParams({ gasPrice: 1 }).addContracts(_contracts).call();
    console.log("10");

    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setPool failed. Reason: ${err}`);
  }
}

export async function setPool(contractId: string, provider: string, wallet: string | WalletLocked, pool: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _pool: ContractIdInput = { value: pool };
    const { transactionResult, transactionResponse } = await contract.functions.set_pool(_pool).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setPool failed. Reason: ${err}`);
  }
}

export async function setExecutionManager(contractId: string, provider: string, wallet: string | WalletLocked, executionManager: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _executionManager: ContractIdInput = { value: executionManager };
    const { transactionResult, transactionResponse } = await contract.functions.set_execution_manager(_executionManager).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setExecutionManager failed. Reason: ${err}`);
  }
}

export async function setTransferSelector(contractId: string, provider: string, wallet: string | WalletLocked, transferSelector: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _transferSelector: ContractIdInput = { value: transferSelector };
    const { transactionResult, transactionResponse } = await contract.functions.set_transfer_selector(_transferSelector).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setTransferSelector failed. Reason: ${err}`);
  }
}

export async function setRoyaltyManager(contractId: string, provider: string, wallet: string | WalletLocked, royaltyManager: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _royaltyManager: ContractIdInput = { value: royaltyManager };
    const { transactionResult, transactionResponse } = await contract.functions.set_royalty_manager(_royaltyManager).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setRoyaltyManager failed. Reason: ${err}`);
  }
}

export async function setAssetManager(contractId: string, provider: string, wallet: string | WalletLocked, assetManager: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _assetManager: ContractIdInput = { value: assetManager };
    const { transactionResult, transactionResponse } = await contract.functions.set_asset_manager(_assetManager).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setAssetManager failed. Reason: ${err}`);
  }
}

export async function setProtocolFeeRecipient(contractId: string, provider: string, wallet: string | WalletLocked, protocolFeeRecipient: string, isRecipientAddress: boolean) {
  try {
    let _protocolFeeRecipient: IdentityInput;
    isRecipientAddress ? (_protocolFeeRecipient = { Address: { value: protocolFeeRecipient } }) : (_protocolFeeRecipient = { ContractId: { value: protocolFeeRecipient } });
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.set_protocol_fee_recipient(_protocolFeeRecipient).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`Exchange. setProtocolFeeRecipient failed. Reason: ${err}`);
  }
}

export async function getPool(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_pool().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function getExecutionManager(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_execution_manager().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function getTransferSelector(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_transfer_selector().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function getRoyaltyManager(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_royalty_manager().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function getAssetManager(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_asset_manager().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function getProtocolFeeRecipient(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_protocol_fee_recipient().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function owner(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.owner().get();
    return { value };
  } catch (err: any) {
    console.error("Exchange: " + err);
    return { err };
  }
}

export async function transferOwnership(contractId: string, provider: string, wallet: string | WalletLocked, newOwner: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _newOwner: IdentityInput = { Address: { value: newOwner } };
    const { transactionResult, transactionResponse } = await contract.functions.transfer_ownership(_newOwner).txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error(`Exchange. transferOwnership failed. Reason: ${err}`);
  }
}

export async function renounceOwnership(contractId: string, provider: string, wallet: string | WalletLocked) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.renounce_ownership().txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error(`Exchange. renounceOwnership failed. Reason: ${err}`);
  }
}
