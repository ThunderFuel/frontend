import { Provider, WalletUnlocked, WalletLocked, BigNumberish, CoinQuantityLike, Contract, BytesLike } from "fuels";
import { Pool } from "../../types/pool";
import { AssetManager } from "../../types/asset_manager/";
import { ContractIdInput, IdentityInput } from "../../types/pool/Pool";

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<Pool> {
    const _provider = await Provider.create(provider)

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider)
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return new Pool(contractId, walletUnlocked)
    } else if (wallet && typeof wallet !== "string") {
        return new Pool(contractId, wallet)
    }

    return new Pool(contractId, _provider)
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    exchange: string,
    assetManager: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _exchange: ContractIdInput = { bits: exchange };
        const _Pool: ContractIdInput = { bits: assetManager };
        const call = await contract.functions
            .initialize(_exchange, _Pool)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Pool. initialize failed. Reason: ${err}`)
    }
}

export async function totalSupply(
    contractId: string,
    provider: string,
    asset: string,
) {
    try {
        const _asset: ContractIdInput = { bits: asset };
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .total_supply(_asset)
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Pool: " + err);
        return { err };
    }
}

export async function balanceOf(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    account: string,
    asset: string,
) {
    try {
        const _account: IdentityInput = { Address: { bits: account } };
        const _asset: ContractIdInput = { bits: asset };
        const contract = await setup(contractId, provider, wallet);
        const { value } = await contract.functions
            .balance_of(_account, _asset)
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("Pool: " + err);
        return { err };
    }
}

export async function deposit(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    amount: BigNumberish,
    assetId: BytesLike,
    assetManagerAddr: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const coin: CoinQuantityLike = { amount: amount, assetId: assetId };
        const _provider = await Provider.create(provider)
        const assetManager = new AssetManager(assetManagerAddr, _provider);
        const { gasUsed } = await contract.functions
            .deposit()
            .txParams({})
            .addContracts([assetManager])
            .callParams({forward: coin})
            .getTransactionCost()

        const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .deposit()
            .txParams({gasLimit})
            .addContracts([assetManager])
            .callParams({forward: coin})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Pool. deposit failed. Reason: ${err}`)
    }
}

export async function withdraw(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    amount: BigNumberish,
    assetId: string,
    assetManagerAddr: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _asset: ContractIdInput = { bits: assetId };
        const _provider = await Provider.create(provider)
        const assetManager = new AssetManager(assetManagerAddr, _provider);
        const { gasUsed } = await contract.functions
            .withdraw(_asset, amount)
            .txParams({variableOutputs: 1})
            .addContracts([assetManager])
            .getTransactionCost()

        const gasLimit = Number(gasUsed) * 1.5

        const call = await contract.functions
            .withdraw(_asset, amount)
            .txParams({variableOutputs: 1, gasLimit})
            .addContracts([assetManager])
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Pool. withdraw failed. Reason: ${err}`)
    }
}

export async function transferFrom(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    from: string,
    to: string,
    asset: string,
    amount: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _from: IdentityInput = { Address: { bits: from } };
        const _to: IdentityInput = { Address: { bits: to } };
        const _asset: ContractIdInput = { bits: asset };
        const call = await contract.functions
            .transfer_from(_from, _to, _asset, amount)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Pool. transferFrom failed. Reason: ${err}`)
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
        const _Pool: ContractIdInput = { bits: assetManager };
        const call = await contract.functions
            .set_asset_manager(_Pool)
            .txParams({variableOutputs: 1})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`Pool. setAssetManager failed. Reason: ${err}`)
    }
}

export async function getTransferManager(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_asset_manager()
            .simulate()
        return { value };
    } catch(err: any) {
        throw Error(`Pool. getTransferManager failed. Reason: ${err}`)
    }
}

export async function getExchange(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_exchange()
            .simulate()
        return { value };
    } catch(err: any) {
        throw Error(`Pool. getExchange failed. Reason: ${err}`)
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
        console.error("Pool: " + err);
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
        throw Error(`Pool. transferOwnership failed. Reason: ${err}`)
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
        throw Error(`Pool. renounceOwnership failed. Reason: ${err}`)
    }
}
