import fs from "fs";
import { Contract, ContractFactory, Provider, WalletUnlocked } from "fuels";
import path from "path";
import { ExecutionManagerAbi__factory } from "../../types/execution_manager/factories/ExecutionManagerAbi__factory";
import * as ExecutionManager from "./execution_manager";

let contract: Contract;

const PROVIDER = new Provider("http://127.0.0.1:4000/graphql");
const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
const STRATEGY = "0x1230000000000000000000000000000000000000000000000000000000000abc";

describe("ExecutionManager", () => {
  beforeAll(async () => {
    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, "../../../../contracts-v1/execution_manager/out/debug/execution_manager.bin"));
    const factory = new ContractFactory(bytecode, ExecutionManagerAbi__factory.abi, OWNER);
    contract = await factory.deployContract();
  });

  it("should initialize", async () => {
    const { transactionResult } = await ExecutionManager.initialize(contract.id.toString(), PROVIDER.url, OWNER.privateKey);
    expect(transactionResult?.status.type).toBe("success");
  });

  it("should get owner", async () => {
    const { value } = await ExecutionManager.owner(contract.id.toString(), PROVIDER.url);
    expect(value?.Address?.value).toBe(OWNER.address.toB256());
  });

  it("should not initialize again", async () => {
    await expect(async () => {
      await ExecutionManager.initialize(contract.id.toString(), PROVIDER.url, OWNER.privateKey);
    }).rejects.toThrow();
  });

  it("should add strategy", async () => {
    const { value } = await ExecutionManager.isStrategyWhitelisted(contract.id.toString(), PROVIDER.url, STRATEGY);
    expect(value?.valueOf()).toBe(false);

    const { transactionResult } = await ExecutionManager.addStrategy(contract.id.toString(), PROVIDER.url, OWNER.privateKey, STRATEGY);
    expect(transactionResult?.status.type).toBe("success");

    const res = await ExecutionManager.getCountWhitelistedStrategy(contract.id.toString(), PROVIDER.url);
    expect(Number(res.value)).toBe(1);

    const res2 = await ExecutionManager.isStrategyWhitelisted(contract.id.toString(), PROVIDER.url, STRATEGY);
    expect(res2.value).toBe(true);

    const res3 = await ExecutionManager.getWhitelistedStrategy(contract.id.toString(), PROVIDER.url, 0);
    expect(res3.value?.value).toBe(STRATEGY);
  });

  it("should not add the same strategy again", async () => {
    await expect(async () => {
      await ExecutionManager.addStrategy(contract.id.toString(), PROVIDER.url, OWNER.privateKey, STRATEGY);
    }).rejects.toThrow();
  });

  it("should remove strategy", async () => {
    const { value } = await ExecutionManager.isStrategyWhitelisted(contract.id.toString(), PROVIDER.url, STRATEGY);
    expect(value?.valueOf()).toBe(true);

    const { transactionResult } = await ExecutionManager.removeStrategy(contract.id.toString(), PROVIDER.url, OWNER.privateKey, STRATEGY);
    expect(transactionResult?.status.type).toBe("success");

    const res = await ExecutionManager.getCountWhitelistedStrategy(contract.id.toString(), PROVIDER.url);
    expect(Number(res.value)).toBe(0);

    const res2 = await ExecutionManager.isStrategyWhitelisted(contract.id.toString(), PROVIDER.url, STRATEGY);
    expect(res2.value).toBe(false);
  });

  it("should not remove the non-whitelisted strategy", async () => {
    await expect(async () => {
      await ExecutionManager.removeStrategy(contract.id.toString(), PROVIDER.url, OWNER.privateKey, STRATEGY);
    }).rejects.toThrow();
  });

  it("should not call if non-owner", async () => {
    await expect(async () => {
      await ExecutionManager.addStrategy(contract.id.toString(), PROVIDER.url, USER.privateKey, STRATEGY);
    }).rejects.toThrow();

    await expect(async () => {
      await ExecutionManager.removeStrategy(contract.id.toString(), PROVIDER.url, USER.privateKey, STRATEGY);
    }).rejects.toThrow();
  });

  it("should transfer ownership", async () => {
    const { transactionResult } = await ExecutionManager.transferOwnership(contract.id.toString(), PROVIDER.url, OWNER.privateKey, USER.address.toB256());
    expect(transactionResult?.status.type).toBe("success");

    const { value } = await ExecutionManager.owner(contract.id.toString(), PROVIDER.url);
    expect(value?.Address?.value).toBe(USER.address.toB256());
  });
});
