import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Contract, ContractIdLike, AbstractContract, AbstractAddress, Address, JsonAbi } from "fuels";
import { TransferManagerAbi__factory } from "../../types/transfer_manager/";
import { TransferManagerAbi, ContractIdInput, IdentityInput } from "../../types/transfer_manager/TransferManagerAbi";

async function setup(contractId: string, provider: string, wallet?: string | WalletLocked): Promise<TransferManagerAbi> {
  const _provider = new Provider(provider);

  if (wallet && typeof wallet === "string") {
    const _provider = new Provider(provider);
    const walletUnlocked: WalletUnlocked = new WalletUnlocked(wallet, _provider);
    return TransferManagerAbi__factory.connect(contractId, walletUnlocked);
  } else if (wallet && typeof wallet !== "string") {
    return TransferManagerAbi__factory.connect(contractId, wallet);
  }

  return TransferManagerAbi__factory.connect(contractId, _provider);
}

export async function initialize(contractId: string, provider: string, wallet: string | WalletLocked, exchange: string) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _exchange: ContractIdInput = { value: exchange };
    const { transactionResult, transactionResponse } = await contract.functions.initialize(_exchange).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferManager. initialize failed. Reason: ${err}`);
  }
}

export async function transferNft(contractId: string, provider: string, wallet: string | WalletLocked, collection: string, from: string, to: string, token_id: BigNumberish, amount: BigNumberish) {
  try {
    const contract = await setup(contractId, provider, wallet);
    const _collection: ContractIdInput = { value: collection };
    const _from: IdentityInput = { Address: { value: from } };
    const _to: IdentityInput = { Address: { value: to } };
    const { transactionResult, transactionResponse } = await contract.functions.transfer_nft(_collection, _from, _to, token_id, amount).txParams({ gasPrice: 1 }).call();
    return { transactionResponse, transactionResult };
  } catch (err: any) {
    throw Error(`TransferManager. transferNft failed. Reason: ${err}`);
  }
}

export async function getExchange(contractId: string, provider: string) {
  try {
    const contract = await setup(contractId, provider);
    const { value } = await contract.functions.get_exchange().get();
    return { value };
  } catch (err: any) {
    console.error("TransferManager: " + err);
    return { err };
  }
}
