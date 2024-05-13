import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Wallet, FunctionInvocationScope, ReceiptMintCoder, Script, Contract } from "fuels";
import { NFTContractAbi__factory } from "../../types/erc721";
import { NFTContractAbi, ContractIdInput, IdentityInput, AssetIdInput } from "../../types/erc721/NFTContractAbi";
import bytecode from "../../scripts/bulk_mint/binFile";
import abi from "../../scripts/bulk_mint/out/bulk_mint-abi.json";

async function setup(
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

export async function mint(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    amount: BigNumberish,
    subId: BigNumberish,
    to: string,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const zeroX = "0x";
        const fill0 = subId.toString().padStart(64, "0")
        const stringSubId = fill0.padStart(66, zeroX)
        const _to: IdentityInput = { Address: { value: to } };
        const { transactionResult, logs } = await contract.functions
            .mint(_to, stringSubId, amount)
            .txParams({gasPrice: 1})
            .call();
        return { transactionResult, logs };
    } catch(err: any) {
        throw Error(`ERC721: mint failed. Reason: ${err}`);
    }
}

export async function bulkMint(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    to: string,
    amount: number,
) {
    let subIDs = [];

    const zeroX = "0x";
    const contract = await setup(contractId, provider, wallet);
    const currentIndexBN = await totalSupply(contractId, provider, wallet);
    const currentIndex = Number(currentIndexBN.value)

    for (let i=currentIndex; i<(currentIndex + amount); i++) {
        const fill0 = i.toString().padStart(64, "0")
        const stringSubId = fill0.padStart(66, zeroX)
        subIDs.push(stringSubId);
    }

    if (subIDs.length === 0) return null;

    try {
        const { minGasPrice } = contract.provider.getGasConfig();
        const _to: IdentityInput = { Address: { value: to } };
        const { transactionResult, logs } = await contract.functions
            .bulk_mint(_to, subIDs)
            .txParams({gasPrice: minGasPrice, variableOutputs: amount})
            .call();
        return { transactionResult, logs };
    } catch(err: any) {
        throw Error(`ERC721: bulkMint failed. Reason: ${err}`);
    }
}

export async function bulkMintScript(
    contractId: string,
    provider: string,
    wallet: WalletLocked | WalletUnlocked,
    to: string,
    amount: number,
) {
    try {
        const _provider = await Provider.create(provider)
        const _contract = new Contract(contractId, NFTContractAbi__factory.abi, _provider);
        const _collection: ContractIdInput = { value: contractId };
        const _to: IdentityInput = { Address: { value: to } };

        const script = new Script(bytecode, abi, wallet)
        const { transactionResult, logs } = await script.functions
            .main(_collection, _to, amount)
            .txParams({gasPrice: 1})
            .addContracts([_contract])
            .call();
        return { transactionResult, logs };
    } catch(err: any) {
        throw Error(`ERC721: bulkMintScript failed. Reason: ${err}`)
    }
}

export async function bulkMintWithMulticall(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
    to: string,
    amount: number,
) {
    let calls: FunctionInvocationScope<any[], any>[] = [];

    const zeroX = "0x";
    const contract = await setup(contractId, provider, wallet);
    const currentIndexBN = await totalSupply(contractId, provider, wallet);
    const currentIndex = Number(currentIndexBN.value)

    for (let i=currentIndex; i<(currentIndex + amount); i++) {
        const fill0 = i.toString().padStart(64, "0")
        const stringSubId = fill0.padStart(66, zeroX)
        const _to: IdentityInput = { Address: { value: to } };
        const mintCall = contract.functions
            .mint(_to, stringSubId, 1)
            .txParams({gasPrice: 1, variableOutputs: 1})
        calls.push(mintCall);
    }

    if (calls.length === 0) return null;

    try {
        const { minGasPrice } = contract.provider.getGasConfig()
        const { transactionResult, logs } = await contract.multiCall(calls)
            .txParams({gasPrice: minGasPrice, variableOutputs: amount})
            .call();
        return { transactionResult, logs };
    } catch(err: any) {
        throw Error(`ERC721: bulkMintWithMulticall failed. Reason: ${err}`);
    }
}

export async function balanceOf(
    assetId: string,
    owner: string,
    provider: Provider
) {
    try {
       const wallet = Wallet.fromAddress(owner, provider);
       const balance = await wallet.getBalance(assetId)
        return { balance };
    } catch(err: any) {
        throw Error('ERC721: balanceOf failed');
    }
}

// export async function ownerOf(
//     contractId: string,
//     provider: string,
//     tokenId: BigNumberish,
// ) {
//     try {
//         const contract = await setup(contractId, provider);
//         const { value } = await contract.functions
//             .owner_of(tokenId)
//             .get();
//         return { value };
//     } catch(err: any) {
//         throw Error(`ERC721: ownerOf failed. Reason: ${err}`);
//     }
// }

export async function totalSupply(
    contractId: string,
    provider: string,
    wallet: string | WalletLocked,
) {
    try {
        const contract = await setup(contractId, provider, wallet);
        const { value } = await contract.functions
            .total_assets()
            .simulate();
        return { value };
    } catch(err: any) {
        throw Error(`ERC721: totalSupply failed. Reason: ${err}`);
    }
}

export async function transfer(
    contractId: string,
    provider: Provider,
    wallet: WalletLocked,
    to: string,
    tokenId: BigNumberish,
    amount: BigNumberish
) {
    try {
        const _to = Wallet.fromAddress(to, provider);
        const zeroX = "0x";
        const fill0 = tokenId.toString().padStart(64, "0");
        const subId = fill0.padStart(66, zeroX);
        const assetId = ReceiptMintCoder.getAssetId(contractId, subId);

        const res = await wallet.transfer(_to.address, amount, assetId, { gasPrice: 1 });
        const txResult = await res.wait();
        return txResult;
    } catch(err: any) {
        throw Error(`ERC721: transfer failed. Reason: ${err}`);
    }
}
