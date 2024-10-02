import { Provider, WalletUnlocked, WalletLocked, BigNumberish } from "fuels";
import { AssetIdInput, IdentityInput } from "../../types/asset_manager/AssetManager";
import { AssetManager } from "../../types/asset_manager";

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<AssetManager> {
    const _provider = await Provider.create(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return new AssetManager(contractId, walletUnlocked)
    } else if (wallet && typeof wallet !== "string") {
        return new AssetManager(contractId, wallet)
    }

    return new AssetManager(contractId, _provider)
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked
) {
    try {
        const contract = await setup(contractId, provider, wallet)
        const call = await contract.functions
            .initialize()
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`AssetManager. initialize failed. Reason: ${err}`)
    }
}

export async function addAsset(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    asset: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet)
        const _asset: AssetIdInput = { bits: asset };
        const call = await contract.functions
            .add_asset(_asset)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`AssetManager. addAsset failed. Reason: ${err}`)
    }
}

export async function removeAsset(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    index: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const call = await contract.functions
            .remove_asset(index)
            .txParams({})
            .call();
        const { transactionResult } = await call.waitForResult()
        return { transactionResult };
    } catch(err: any) {
        throw Error(`AssetManager. removeAsset failed. Reason: ${err}`)
    }
}

export async function isAssetSupported(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    asset: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _asset: AssetIdInput = { bits: asset };
        const { value } = await contract.functions
            .is_asset_supported(_asset)
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("AssetManager: " + err);
        return { err };
    }
}

export async function getSupportedAsset(
    contractId: string,
    provider: string,
    index: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_supported_asset(index)
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("AssetManager: " + err);
        return { err };
    }
}

export async function getCountSupportedAssets(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_count_supported_assets()
            .simulate();
        return { value };
    } catch(err: any) {
        console.error("AssetManager: " + err);
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
        console.error("AssetManager: " + err);
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
        throw Error(`AssetManager. transferOwnership failed. Reason: ${err}`)
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
        throw Error(`AssetManager. renounceOwnership failed. Reason: ${err}`)
    }
}
