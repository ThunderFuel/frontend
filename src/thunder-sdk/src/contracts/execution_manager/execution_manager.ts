import { Provider, WalletUnlocked, WalletLocked, BigNumberish } from "fuels";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager";
import { ExecutionManagerAbi, ContractIdInput, IdentityInput } from "../../types/execution_manager/ExecutionManagerAbi";

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<ExecutionManagerAbi> {
    const _provider = await Provider.create(provider)

    if (wallet && typeof wallet === "string") {
        const _provider = await Provider.create(provider)
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return ExecutionManagerAbi__factory.connect(contractId, walletUnlocked);
    } else if (wallet && typeof wallet !== "string") {
        return ExecutionManagerAbi__factory.connect(contractId, wallet);
    }

    return ExecutionManagerAbi__factory.connect(contractId, _provider);
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked
) {
    try {
        const contract = await setup(contractId, provider, wallet)
        const { waitForResult } = await contract.functions
            .initialize()
            .txParams({})
            .call();
        const { transactionResult } = await waitForResult();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`ExecutionManager. initialize failed. Reason: ${err}`)
    }
}

export async function addStrategy(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    strategy: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _strategy: ContractIdInput = { bits: strategy };
        const { waitForResult } = await contract.functions
            .add_strategy(_strategy)
            .txParams({})
            .call();
        const { transactionResult } = await waitForResult();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`ExecutionManager. addStrategy failed. Reason: ${err}`)
    }
}

export async function removeStrategy(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    index: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { waitForResult } = await contract.functions
            .remove_strategy(index)
            .txParams({})
            .call();
        const { transactionResult } = await waitForResult();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`ExecutionManager. removeStrategy failed. Reason: ${err}`)
    }
}

export async function isStrategyWhitelisted(
    contractId: string,
    provider: string,
    strategy: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const _strategy: ContractIdInput = { bits: strategy };
        const { value } = await contract.functions
            .is_strategy_whitelisted(_strategy)
            .simulate();
        return { value };
    } catch(err: any) {
        return { err };
    }
}

export async function getWhitelistedStrategy(
    contractId: string,
    provider: string,
    index: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_whitelisted_strategy(index)
            .simulate();
        return { value };
    } catch(err: any) {
        return { err };
    }
}

export async function getCountWhitelistedStrategy(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_count_whitelisted_strategies()
            .simulate();
        return { value };
    } catch(err: any) {
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
        const { waitForResult } = await contract.functions
            .transfer_ownership(_newOwner)
            .txParams({})
            .call();
        const { transactionResult } = await waitForResult();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`ExecutionManager. transferOwnership failed. Reason: ${err}`)
    }
}

export async function renounceOwnership(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { waitForResult } = await contract.functions
            .renounce_ownership()
            .txParams({})
            .call();
        const { transactionResult } = await waitForResult();
        return { transactionResult };
    } catch(err: any) {
        throw Error(`ExecutionManager. renounceOwnership failed. Reason: ${err}`)
    }
}
