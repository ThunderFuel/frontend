import { Provider, WalletUnlocked, WalletLocked, BigNumberish } from "fuels";
import { NFTAbi__factory } from "../../types/erc721";
import { NFTAbi, ContractIdInput, IdentityInput } from "../../types/erc721/NFTAbi";

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<NFTAbi> {
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

export async function initialize(contractId: string, provider: string, wallet: string | WalletLocked, maxSupply: BigNumberish, transferManager: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _transferManager: ContractIdInput = { value: transferManager };
    const { transactionResult, transactionResponse } = await contract.functions.initialize(maxSupply, _transferManager).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`ERC721: Initialize failed. Reason: ${err}`);
  }
}

export async function mint(contractId: string, provider: string, wallet: string | WalletLocked, amount: BigNumberish, to: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _to: IdentityInput = { Address: { value: to } };
    const { transactionResult, transactionResponse } = await contract.functions.mint(amount, _to).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error("ERC721: mint failed");
  }
}

export async function balanceOf(contractId: string, provider: string, owner: string) {
  try {
    const contract = await setup(contractId, provider);
    const _owner: IdentityInput = { Address: { value: owner } };
    const { value } = await contract.functions.balance_of(_owner).get();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: balanceOf failed");
  }
}

export async function ownerOf(contractId: string, provider: string, tokenId: BigNumberish) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.owner_of(tokenId).get();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: ownerOf failed");
  }
}

export async function getApproved(contractId: string, provider: string, tokenId: BigNumberish) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.approved(tokenId).get();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: getApproved failed");
  }
}

export async function isApprovedForAll(contractId: string, provider: string, owner: string, operator: string) {
  try {
    const contract = await setup(contractId, provider);
    const _owner: IdentityInput = { Address: { value: owner } };
    const _operator: IdentityInput = { ContractId: { value: operator } };
    const { value } = await contract.functions.is_approved_for_all(_owner, _operator).get();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: isApprovedForAll failed");
  }
}

export async function supportsInterface(contractId: string, provider: string, interfaceId: BigNumberish) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.supports_interface(interfaceId).get();
    return { value };
  } catch (err: any) {
    throw Error("ERC721: supportsInterface failed");
  }
}

export async function setApprovalForAll(contractId: string, provider: string, wallet: string | WalletLocked, operator: string, approved: boolean) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _operator: IdentityInput = { ContractId: { value: operator } };
    const { transactionResult, transactionResponse } = await contract.functions.set_approval_for_all(approved, _operator).txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error("ERC721: setApprovalForAll failed");
  }
}

export async function safeTransferFrom(contractId: string, provider: string, wallet: string | WalletLocked, from: string, to: string, tokenId: BigNumberish) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _from: IdentityInput = { Address: { value: from } };
    const _to: IdentityInput = { Address: { value: to } };
    const { transactionResult, transactionResponse } = await contract.functions.transfer(_to, tokenId).txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error("ERC721: safeTransferFrom failed");
  }
}
