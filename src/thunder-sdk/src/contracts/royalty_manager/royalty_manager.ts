import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Contract } from "fuels";
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager";
import { RoyaltyManagerAbi, IdentityInput, ContractIdInput } from "../../types/royalty_manager/RoyaltyManagerAbi";

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<RoyaltyManagerAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return RoyaltyManagerAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return RoyaltyManagerAbi__factory.connect(contractId, wallet);
  }

  return RoyaltyManagerAbi__factory.connect(contractId, _provider);
}

export async function initialize(contractId: string, provider: string, wallet: string | WalletLocked) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.initialize().txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`RoyaltyManager. initialize failed. Reason: ${err}`);
  }
}

export async function registerRoyaltyInfo(contractId: string, provider: string, wallet: string | WalletLocked, collection: string, receiver: string, isReceiverAddress: boolean, fee: BigNumberish) {
  try {
    let _receiver: IdentityInput;
    isReceiverAddress ? (_receiver = { Address: { value: receiver } }) : (_receiver = { ContractId: { value: receiver } });
    const contract = await setup(contractId, provider, wallet);
    const _collection: ContractIdInput = { value: collection };
    const _provider = new Provider(provider);
    const _collectionContract = new Contract(collection, RoyaltyManagerAbi__factory.abi, _provider);
    const { transactionResult, transactionResponse } = await contract.functions.register_royalty_info(_collection, _receiver, fee).txParams({ gasPrice: 1 }).addContracts([_collectionContract]).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`RoyaltyManager. registerRoyaltyInfo failed. Reason: ${err}`);
  }
}

export async function getRoyaltyInfo(contractId: string, provider: string, collection: string) {
  try {
    const contract = await setup(contractId, provider);
    const _collection: ContractIdInput = { value: collection };
    const { value } = await contract.functions.get_royalty_info(_collection).get();
    return { value };
  } catch (err: any) {
    console.error("RoyaltyManager: " + err);
    return { err };
  }
}

export async function setRoyaltyFeeLimit(contractId: string, provider: string, wallet: string | WalletLocked, feeLimit: BigNumberish) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.set_royalty_fee_limit(feeLimit).txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error(`RoyaltyManager. setRoyaltyFeeLimit failed. Reason: ${err}`);
  }
}

export async function getRoyaltyFeeLimit(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_royalty_fee_limit().get();
    return { value };
  } catch (err: any) {
    console.error("RoyaltyManager: " + err);
    return { err };
  }
}

export async function owner(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.owner().get();
    return { value };
  } catch (err: any) {
    console.error("RoyaltyManager: " + err);
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
    throw Error(`RoyaltyManager. transferOwnership failed. Reason: ${err}`);
  }
}

export async function renounceOwnership(contractId: string, provider: string, wallet: string | WalletLocked) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const { transactionResult, transactionResponse } = await contract.functions.renounce_ownership().txParams({ gasPrice: 1 }).call();
    return { transactionResult, transactionResponse };
  } catch (err: any) {
    throw Error(`RoyaltyManager. renounceOwnership failed. Reason: ${err}`);
  }
}
