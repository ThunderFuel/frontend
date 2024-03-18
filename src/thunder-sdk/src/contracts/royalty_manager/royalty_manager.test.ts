import fs from 'fs';
import { Contract, ContractFactory, Provider, WalletUnlocked } from 'fuels';
import path from 'path';
import { RoyaltyManagerAbi__factory } from "../../types/royalty_manager/factories/RoyaltyManagerAbi__factory";
import * as RoyaltyManager from './royalty_manager';

// let contract: Contract

// const PROVIDER = new Provider('http://127.0.0.1:4000/graphql');
// const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
// const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
// const COLLECTION = "0x1230000000000000000000000000000000000000000000000000000000000abc";

// describe('RoyaltyManager', () => {
//     beforeAll(async () => {
//         // Deploy
//         const bytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/royalty_manager/out/debug/royalty_manager.bin'));
//         const factory = new ContractFactory(bytecode, RoyaltyManagerAbi__factory.abi, OWNER);
//         contract = await factory.deployContract();
//     });

//     it('should initialize', async () => {
//         const { transactionResult } = await RoyaltyManager.initialize(
//             contract.id.toString(),
//             PROVIDER.url,
//             OWNER.privateKey
//         );
//         expect(transactionResult.isStatusSuccess).toBeTruthy();
//     });

//     it('should get owner', async () => {
//         const { value } = await RoyaltyManager.owner(contract.id.toString(), PROVIDER.url);
//         expect(value?.Address?.value).toBe(OWNER.address.toB256());
//     });

//     it('should not initialize again', async () => {
//         await expect(async () => {
//             await RoyaltyManager.initialize(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 OWNER.privateKey
//             )
//         }).rejects.toThrow();
//     });

//     it('should set fee limit', async () => {
//         const { transactionResult } = await RoyaltyManager.setRoyaltyFeeLimit(
//             contract.id.toString(),
//             PROVIDER.url,
//             OWNER.privateKey,
//             1000
//         );
//         expect(transactionResult.isStatusSuccess).toBeTruthy();

//         const { value } = await RoyaltyManager.getRoyaltyFeeLimit(
//             contract.id.toString(),
//             PROVIDER.url
//         );
//         expect(Number(value)).toBe(1000);
//     });

//     it('should not set fee limit too high', async () => {
//         await expect(async () => {
//             await RoyaltyManager.setRoyaltyFeeLimit(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 OWNER.privateKey,
//                 1001
//             )
//         }).rejects.toThrow();
//     });

//     it('should not set fee limit by non-owner', async () => {
//         await expect(async () => {
//             await RoyaltyManager.setRoyaltyFeeLimit(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 USER.privateKey,
//                 1000
//             )
//         }).rejects.toThrow();
//     });

//     it('should register royalty info', async () => {
//         const res = await RoyaltyManager.getRoyaltyInfo(
//             contract.id.toString(),
//             PROVIDER.url,
//             contract.id.toB256()
//         );
//         expect(res.value).toBeUndefined();

//         const { transactionResult } = await RoyaltyManager.registerRoyaltyInfo(
//             contract.id.toString(),
//             PROVIDER.url,
//             OWNER.privateKey,
//             contract.id.toB256(),
//             OWNER.address.toB256(),
//             true,
//             500
//         );
//         expect(transactionResult.isStatusSuccess).toBeTruthy();

//         const { value } = await RoyaltyManager.getRoyaltyInfo(
//             contract.id.toString(),
//             PROVIDER.url,
//             contract.id.toB256()
//         );
//         expect(value?.collection.value).toBe(contract.id.toB256());
//         expect(Number(value?.fee)).toBe(500);
//         expect(value?.receiver.Address?.value).toBe(OWNER.address.toB256());
//     });

//     it('should not register by non-owner', async () => {
//         await expect(async () => {
//             await RoyaltyManager.registerRoyaltyInfo(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 USER.privateKey,
//                 contract.id.toB256(),
//                 OWNER.address.toB256(),
//                 true,
//                 500
//             )
//         }).rejects.toThrow();
//     });

//     it('should revert if no owner or admin', async () => {
//         await expect(async () => {
//             await RoyaltyManager.registerRoyaltyInfo(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 OWNER.privateKey,
//                 COLLECTION,
//                 OWNER.address.toB256(),
//                 true,
//                 500
//             )
//         }).rejects.toThrow();
//     });

//     it('should not register royalty fee higher than limit', async () => {
//         await expect(async () => {
//             await RoyaltyManager.registerRoyaltyInfo(
//                 contract.id.toString(),
//                 PROVIDER.url,
//                 OWNER.privateKey,
//                 contract.id.toB256(),
//                 OWNER.address.toB256(),
//                 true,
//                 1001
//             )
//         }).rejects.toThrow();
//     });

//     it('should transfer ownership', async () => {
//         const { transactionResult } = await RoyaltyManager.transferOwnership(
//             contract.id.toString(),
//             PROVIDER.url,
//             OWNER.privateKey,
//             USER.address.toB256()
//         );
//         expect(transactionResult.isStatusSuccess).toBeTruthy();

//         const { value } = await RoyaltyManager.owner(
//             contract.id.toString(),
//             PROVIDER.url
//         );
//         expect(value?.Address?.value).toBe(USER.address.toB256());
//     });
// });
