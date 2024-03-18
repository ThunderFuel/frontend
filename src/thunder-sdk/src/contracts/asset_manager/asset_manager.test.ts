import fs from 'fs';
import { Contract, ContractFactory, BaseAssetId, Provider, WalletUnlocked } from 'fuels';
import path from 'path';
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import * as AssetManager from './asset_manager';

// let contract: Contract;

// const PROVIDER = new Provider('http://127.0.0.1:4000/graphql');
// const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
// const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);

// describe('AssetManager', () => {
//   beforeAll(async () => {
//     // Deploy
//     const bytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/asset_manager/out/debug/asset_manager.bin'));
//     const factory = new ContractFactory(bytecode, AssetManagerAbi__factory.abi, OWNER);
//     contract = await factory.deployContract();
//   });

//   it('should initialize', async () => {
//     const { transactionResult } = await AssetManager.initialize(
//       contract.id.toString(),
//       PROVIDER.url,
//       OWNER.privateKey
//     );
//     expect(transactionResult.isStatusSuccess).toBeTruthy();
//   });

//   it('should get owner', async () => {
//     const { value } = await AssetManager.owner(contract.id.toString(), PROVIDER.url);
//     expect(value?.Address?.value).toBe(OWNER.address.toB256());
//   });

//   it('should not initialize again', async () => {
//     await expect(async () => {
//       await AssetManager.initialize(
//         contract.id.toString(),
//         PROVIDER.url,
//         OWNER.privateKey
//       )
//     }).rejects.toThrow();
//   });

//   it('should add asset', async () => {
//     const { value } = await AssetManager.isAssetSupported(
//       contract.id.toString(),
//       PROVIDER.url,
//       BaseAssetId
//     );
//     expect(value).toBe(false);

//     const { transactionResult } = await AssetManager.addAsset(
//       contract.id.toString(),
//       PROVIDER.url,
//       OWNER.privateKey,
//       BaseAssetId
//     );
//     expect(transactionResult.isStatusSuccess).toBeTruthy();

//     const res = await AssetManager.getCountSupportedAssets(contract.id.toString(), PROVIDER.url);
//     expect(Number(res.value)).toBe(1);

//     const res2 = await AssetManager.isAssetSupported(
//       contract.id.toString(),
//       PROVIDER.url,
//       BaseAssetId
//     );
//     expect(res2.value).toBe(true);

//     const res3 = await AssetManager.getSupportedAsset(contract.id.toString(), PROVIDER.url, 0);
//     expect(res3.value?.value).toBe(BaseAssetId);
//   });

//   it('should not add the same asset again', async () => {
//     await expect(async () => {
//       await AssetManager.addAsset(
//         contract.id.toString(),
//         PROVIDER.url,
//         OWNER.privateKey,
//         BaseAssetId
//       )
//     }).rejects.toThrow();
//   });

//   it('should remove asset', async () => {
//     const { value } = await AssetManager.isAssetSupported(
//       contract.id.toString(),
//       PROVIDER.url,
//       BaseAssetId
//     );
//     expect(value).toBe(true);

//     const { transactionResult } = await AssetManager.removeAsset(
//       contract.id.toString(),
//       PROVIDER.url,
//       OWNER.privateKey,
//       BaseAssetId
//     );
//     expect(transactionResult.isStatusSuccess).toBeTruthy();

//     const res = await AssetManager.getCountSupportedAssets(contract.id.toString(), PROVIDER.url);
//     expect(Number(res.value)).toBe(0);

//     const res2 = await AssetManager.isAssetSupported(
//       contract.id.toString(),
//       PROVIDER.url,
//       BaseAssetId
//     );
//     expect(res2.value).toBe(false);
//   });

//   it('should not remove non supported asset', async () => {
//     await expect(async () => {
//       await AssetManager.removeAsset(
//         contract.id.toString(),
//         PROVIDER.url,
//         OWNER.privateKey,
//         BaseAssetId
//       )
//     }).rejects.toThrow();
//   });

//   it('should not call if non-owner', async () => {
//     await expect(async () => {
//       await AssetManager.addAsset(
//         contract.id.toString(),
//         PROVIDER.url,
//         USER.privateKey,
//         BaseAssetId
//       )
//     }).rejects.toThrow();

//     await expect(async () => {
//       await AssetManager.removeAsset(
//         contract.id.toString(),
//         PROVIDER.url,
//         USER.privateKey,
//         BaseAssetId
//       )
//     }).rejects.toThrow();
//   });

//   it('should transfer ownership', async () => {
//     const { transactionResult } = await AssetManager.transferOwnership(
//       contract.id.toString(),
//       PROVIDER.url,
//       OWNER.privateKey,
//       USER.address.toB256()
//     );
//     expect(transactionResult.isStatusSuccess).toBeTruthy();

//     const { value } = await AssetManager.owner(contract.id.toString(), PROVIDER.url);
//     expect(value?.Address?.value).toBe(USER.address.toB256());
//   });
// });
