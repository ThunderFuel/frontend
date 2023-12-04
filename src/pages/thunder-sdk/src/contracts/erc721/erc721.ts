import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Wallet, FunctionInvocationScope, ReceiptMintCoder, BaseAssetId } from "fuels";
import { NFTContractAbi__factory } from "../../types/erc721";
import { NFTContractAbi, ContractIdInput, IdentityInput, AssetIdInput } from "../../types/erc721/NFTContractAbi";

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<NFTContractAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return NFTContractAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return NFTContractAbi__factory.connect(contractId, wallet);
  }

  return NFTContractAbi__factory.connect(contractId, _provider);
}

// export async function initialize(
//     contractId: string,
//     provider: string,
//     wallet: string | WalletLocked,
//     maxSupply: BigNumberish,
//     transferManager: string,
// ) {
//     try {
//         const contract = await setup(contractId, provider, wallet);
//         const _transferManager: ContractIdInput = { value: transferManager };
//         const { transactionResult, transactionResponse } = await contract.functions
//             .initialize(maxSupply, _transferManager)
//             .txParams({gasPrice: 1})
//             .call();
//         return { transactionResponse, transactionResult };
//     } catch(err: any) {
//         throw Error(`ERC721: Initialize failed. Reason: ${err}`);
//     }
// }

export async function mint(contractId: string, provider: string, wallet: string | WalletLocked, amount: BigNumberish, subId: BigNumberish, to: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const zeroX = "0x";
    const fill0 = subId.toString().padStart(64, "0");
    const stringSubId = fill0.padStart(66, zeroX);
    const _to: IdentityInput = { Address: { value: to } };
    const { transactionResult, transactionResponse, logs } = await contract.functions.mint(_to, stringSubId, amount).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult, logs };
  } catch (err: any) {
    throw Error(`ERC721: mint failed. Reason: ${err}`);
  }
}

export async function bulkMint(contractId: string, provider: string, wallet: string | WalletLocked, to: string, startIndex: number, amount: number) {
  let calls: FunctionInvocationScope<any[], any>[] = [];

  const zeroX = "0x";
  const contract = await setup(contractId, provider, wallet);

  for (let i = startIndex; i < startIndex + amount; i++) {
    const fill0 = i.toString().padStart(64, "0");
    const stringSubId = fill0.padStart(66, zeroX);
    const _to: IdentityInput = { Address: { value: to } };
    const mintCall = contract.functions.mint(_to, stringSubId, 1).txParams({ gasPrice: 1 });
    calls.push(mintCall);
  }

  if (calls.length === 0) return null;

  try {
    const { transactionResult, transactionResponse } = await contract.multiCall(calls).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`ERC721: bulkMint failed. Reason: ${err}`);
  }
}

export async function balanceOf(assetId: string, owner: string) {
  try {
    const wallet = Wallet.fromAddress(owner);
    const balance = await wallet.getBalance(assetId);
    return { balance };
  } catch (err: any) {
    throw Error("ERC721: balanceOf failed");
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

export async function totalSupply(contractId: string, provider: string, asset: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.total_assets().simulate();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: totalSupply failed");
  }
}

export async function transfer(contractId: string, provider: string, wallet: WalletLocked, to: string, tokenId: BigNumberish, amount: BigNumberish) {
  try {
    const _to = Wallet.fromAddress(to, provider);
    const zeroX = "0x";
    const fill0 = tokenId.toString().padStart(64, "0");
    const subId = fill0.padStart(66, zeroX);
    const assetId = ReceiptMintCoder.getAssetId(contractId, subId);

    const res = await wallet.transfer(_to.address, amount, assetId, { gasPrice: 1 });
    const txResult = await res.wait();
    return txResult;
  } catch (err: any) {
    throw Error(`ERC721: transfer failed. Reason: ${err}`);
  }
}
