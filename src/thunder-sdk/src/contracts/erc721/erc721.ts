import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Wallet, FunctionInvocationScope, ReceiptMintCoder, Script, Contract } from "fuels";
import { NFTContract } from "../../types/erc721";
import { ContractIdInput, IdentityInput, AssetIdInput } from "../../types/erc721/NFTContract";
import bytecode from "../../scripts/bulk_mint/binFile";
import abi from "../../scripts/bulk_mint/out/bulk_mint-abi.json";

async function setup(
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
        const _to: IdentityInput = { Address: { bits: to } };
        const call = await contract.functions
            .mint(_to, stringSubId, amount)
            .txParams({})
            .call();
        const { transactionResult, logs } = await call.waitForResult()
        return { transactionResult, logs };
    } catch(err: any) {
        throw Error(`ERC721: mint failed. Reason: ${err}`);
    }
}

// export async function bulkMint(
//     contractId: string,
//     provider: string,
//     wallet: string | WalletLocked,
//     to: string,
//     amount: number,
// ) {
//     let subIDs = [];

//     const zeroX = "0x";
//     const contract = await setup(contractId, provider, wallet);
//     const currentIndexBN = await totalSupply(contractId, provider, wallet);
//     const currentIndex = Number(currentIndexBN.value)

//     for (let i=currentIndex; i<(currentIndex + amount); i++) {
//         const fill0 = i.toString().padStart(64, "0")
//         const stringSubId = fill0.padStart(66, zeroX)
//         subIDs.push(stringSubId);
//     }

//     if (subIDs.length === 0) return null;

//     try {
//         const _to: IdentityInput = { Address: { bits: to } };
//         const { transactionResult, logs } = await contract.functions
//             .bulk_mint(_to, subIDs)
//             .txParams({variableOutputs: amount})
//             .call();
//         return { transactionResult, logs };
//     } catch(err: any) {
//         throw Error(`ERC721: bulkMint failed. Reason: ${err}`);
//     }
// }

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
        const _to: IdentityInput = { Address: { bits: to } };
        const mintCall = contract.functions
            .mint(_to, stringSubId, 1)
            .txParams({variableOutputs: 1})
        calls.push(mintCall);
    }

    if (calls.length === 0) return null;

    try {
        const call = await contract.multiCall(calls)
            .txParams({ variableOutputs: amount})
            .call();
        const { transactionResult, logs } = await call.waitForResult()
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

        const res = await wallet.transfer(_to.address, amount, assetId, {  });
        const txResult = await res.wait();
        return txResult;
    } catch(err: any) {
        throw Error(`ERC721: transfer failed. Reason: ${err}`);
    }
}
