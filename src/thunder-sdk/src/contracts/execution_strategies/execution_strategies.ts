import { Provider, WalletUnlocked, WalletLocked, BigNumberish } from "fuels";
import { StrategyFixedPriceSaleAbi__factory } from "../../types/execution_strategies/strategy_fixed_price_sale";
import { StrategyFixedPriceSaleAbi, ContractIdInput, AddressInput, IdentityInput, SideInput } from "../../types/execution_strategies/strategy_fixed_price_sale/StrategyFixedPriceSaleAbi";

async function setup(
    contractId: string,
    provider: string,
    wallet?: string | WalletLocked,
): Promise<StrategyFixedPriceSaleAbi> {
    const _provider = new Provider(provider);

    if (wallet && typeof wallet === "string") {
        const _provider = new Provider(provider);
        const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
        return StrategyFixedPriceSaleAbi__factory.connect(contractId, walletUnlocked);
    } else if (wallet && typeof wallet !== "string") {
        return StrategyFixedPriceSaleAbi__factory.connect(contractId, wallet);
    }

    return StrategyFixedPriceSaleAbi__factory.connect(contractId, _provider);
}

export async function initialize(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    exchange: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const _exchange: ContractIdInput = { value: exchange };
        const { transactionResult, transactionResponse } = await contract.functions
            .initialize(_exchange)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResponse, transactionResult };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function setProtocolFee(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    fee: BigNumberish,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { transactionResult, transactionResponse } = await contract.functions
            .set_protocol_fee(fee)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResponse, transactionResult };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function getProtocolFee(
    contractId: string,
    provider: string,
) {
    try {
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_protocol_fee()
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
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
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function getMakerOrderOfUser(
    contractId: string,
    provider: string,
    user: string,
    nonce: BigNumberish,
    isBuyOrder: boolean,
) {
    try {
        let side: SideInput;
        isBuyOrder?
            side = { Buy: [] } :
            side = { Sell: [] };
        const _user: AddressInput = { value: user };
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_maker_order_of_user(_user, nonce, side)
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function isValidOrder(
    contractId: string,
    provider: string,
    user: string,
    nonce: BigNumberish,
    isBuyOrder: boolean,
) {
    try {
        let side: SideInput;
        isBuyOrder?
            side = { Buy: [] } :
            side = { Sell: [] };
        const _user: AddressInput = { value: user };
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .is_valid_order(_user, nonce, side)
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function getOrderNonceOfUser(
    contractId: string,
    provider: string,
    user: string,
    isBuyOrder: boolean,
) {
    try {
        let side: SideInput;
        isBuyOrder?
            side = { Buy: [] } :
            side = { Sell: [] };
        const _user: AddressInput = { value: user };
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_order_nonce_of_user(_user, side)
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function getMinOrderNonceOfUser(
    contractId: string,
    provider: string,
    user: string,
    isBuyOrder: boolean,
) {
    try {
        let side: SideInput;
        isBuyOrder?
            side = { Buy: [] } :
            side = { Sell: [] };
        const _user: AddressInput = { value: user };
        const contract = await setup(contractId, provider);
        const { value } = await contract.functions
            .get_min_order_nonce_of_user(_user, side)
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
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
            .get();
        return { value };
    } catch(err: any) {
        console.error("Strategy: " + err);
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
        const { transactionResult, transactionResponse } = await contract.functions
            .transfer_ownership(_newOwner)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult, transactionResponse };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}

export async function renounceOwnership(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { transactionResult, transactionResponse } = await contract.functions
            .renounce_ownership()
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult, transactionResponse };
    } catch(err: any) {
        console.error("Strategy: " + err);
        return { err };
    }
}
