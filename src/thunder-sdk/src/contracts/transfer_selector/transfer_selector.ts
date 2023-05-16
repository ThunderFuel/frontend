import { Provider, WalletUnlocked, WalletLocked, Contract } from "fuels";
import { NFTAbi__factory } from "../../types/erc721";
import { TransferSelectorAbi__factory } from "../../types/transfer_selector";
import { TransferSelectorAbi, IdentityInput, ContractIdInput } from "../../types/transfer_selector/TransferSelectorAbi";

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<TransferSelectorAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return TransferSelectorAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return TransferSelectorAbi__factory.connect(contractId, wallet);
  }

  return TransferSelectorAbi__factory.connect(contractId, _provider);
}

export async function initialize(contractId: string, provider: string, wallet: string | WalletLocked, transferManager721: string, transferManager1155: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _transferManager721: ContractIdInput = { value: transferManager721 };
    const _transferManager1155: ContractIdInput = { value: transferManager1155 };
    const { transactionResult, transactionResponse } = await contract.functions.initialize(_transferManager721, _transferManager1155).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferSelector. initialize failed. Reason: ${err}`);
  }
}

export async function getTransferManager721(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_transfer_manager_721().get();
    return { value };
  } catch (err: any) {
    console.error("TransferSelector: " + err);
    return { err };
  }
}

export async function getTransferManager1155(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_transfer_manager_1155().get();
    return { value };
  } catch (err: any) {
    console.error("TransferSelector: " + err);
    return { err };
  }
}

export async function getTransferManagerForToken(contractId: string, provider: string, collection: string) {
  try {
    const contract = await setup(contractId, provider);
    const _collection: ContractIdInput = { value: collection };
    const { value } = await contract.functions.get_transfer_manager_for_token(_collection).get();
    return { value };
  } catch (err: any) {
    console.error("TransferSelector: " + err);
    return { err };
  }
}

export async function setTransferManager721(contractId: string, provider: string, wallet: string | WalletLocked, transferManager721: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _transferManager721: ContractIdInput = { value: transferManager721 };
    const { transactionResponse, transactionResult } = await contract.functions.set_transfer_manager_721(_transferManager721).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferSelector. setTransferManager721 failed. Reason: ${err}`);
  }
}

export async function setTransferManager1155(contractId: string, provider: string, wallet: string | WalletLocked, transferManager1155: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _transferManager721: ContractIdInput = { value: transferManager1155 };
    const { transactionResponse, transactionResult } = await contract.functions.set_transfer_manager_1155(_transferManager721).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferSelector. setTransferManager1155 failed. Reason: ${err}`);
  }
}

export async function addCollectionTransferManager(contractId: string, provider: string, wallet: string | WalletLocked, collection: string, transferManager: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _collection: ContractIdInput = { value: collection };
    const _transferManager: ContractIdInput = { value: transferManager };
    const { transactionResponse, transactionResult } = await contract.functions.add_collection_transfer_manager(_collection, _transferManager).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferSelector. addCollectionTransferManager failed. Reason: ${err}`);
  }
}

export async function removeCollectionTransferManager(contractId: string, provider: string, wallet: string | WalletLocked, collection: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _collection: ContractIdInput = { value: collection };
    const { transactionResponse, transactionResult } = await contract.functions.remove_collection_transfer_manager(_collection).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferSelector. removeCollectionTransferManager failed. Reason: ${err}`);
  }
}

export async function owner(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.owner().get();
    return { value };
  } catch (err: any) {
    console.error("TransferSelector: " + err);
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
    throw Error(`TransferSelector. transferOwnership failed. Reason: ${err}`);
  }
}

export async function renounceOwnership(contractId: string, provider: string, wallet: string | WalletLocked) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.renounce_ownership().txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error(`TransferSelector. renounceOwnership failed. Reason: ${err}`);
  }
}
