import fs from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked } from "fuels";
import path from "path";
import { TransferManagerAbi__factory } from "../../types/transfer_manager/factories/TransferManagerAbi__factory";
import * as TransferManager from "./transfer_manager";

let contract: Contract;

const PROVIDER = new Provider("http://127.0.0.1:4000/graphql");
const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
const EXCHANGE = "0x1230000000000000000000000000000000000000000000000000000000000abc";
const COLLECTION = "0x1000000000000000000000000000000000000000000000000000000000000abc";

describe("TransferManager", () => {
  beforeAll(async () => {
    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, "../../../../contracts-v1/transfer_manager/out/debug/transfer_manager.bin"));
    const factory = new ContractFactory(bytecode, TransferManagerAbi__factory.abi, OWNER);
    contract = await factory.deployContract();
  });

  it("should initialize", async () => {
    const { transactionResult } = await TransferManager.initialize(contract.id.toString(), PROVIDER.url, OWNER.privateKey, EXCHANGE);
    expect(transactionResult?.status.type).toBe("success");
  });

  it("should not initialize again", async () => {
    await expect(async () => {
      await TransferManager.initialize(contract.id.toString(), PROVIDER.url, OWNER.privateKey, EXCHANGE);
    }).rejects.toThrow();
  });

  it("should get exchange", async () => {
    const { value } = await TransferManager.getExchange(contract.id.toString(), PROVIDER.url);
    expect(value?.value).toBe(EXCHANGE);
  });

  it("should not be callable by non-exchange", async () => {
    await expect(async () => {
      await TransferManager.transferNft(contract.id.toString(), PROVIDER.url, OWNER.privateKey, COLLECTION, OWNER.address.toB256(), USER.address.toB256(), 1, 1);
    }).rejects.toThrow();
  });
});
