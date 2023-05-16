import { Contract, ContractFactory, Provider, WalletUnlocked, NativeAssetId, Address } from "fuels";

const main = async (addr: string) => {
  const a = Address.fromString(addr);
  return a.toB256();
};

main("fuel1dd3cqn8mlxzku689kmn6au3cmjp3rmz4hmqymam5qqaze9hqgx8qtjpwn9").then((res) => {
  console.log(res);
});
