import fs from 'fs';
import { Contract, ContractFactory, Provider, WalletUnlocked, BaseAssetId } from 'fuels';
import path from 'path';
import { PoolAbi__factory } from "../../types/pool/factories/PoolAbi__factory";
import { AssetManagerAbi__factory } from "../../types/asset_manager/factories/AssetManagerAbi__factory";
import * as Pool from './pool';
import * as AssetManager from '../asset_manager';

let contract: Contract
let assetManager: Contract;

const PROVIDER = new Provider('http://127.0.0.1:4000/graphql');
const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
const EXCHANGE = "0x1230000000000000000000000000000000000000000000000000000000000abc";
const ASSET = "0x1000000000000000000000000000000000000000000000000000000000000abc";
const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe('Pool', () => {
    beforeAll(async () => {
        // Deploy Pool
        const bytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/pool/out/debug/pool.bin'));
        const factory = new ContractFactory(bytecode, PoolAbi__factory.abi, OWNER);
        contract = await factory.deployContract();

        // Deploy AssetManager
        const assetManagerBytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/asset_manager/out/debug/asset_manager.bin'));
        const assetManagerFactory = new ContractFactory(assetManagerBytecode, AssetManagerAbi__factory.abi, OWNER);
        assetManager = await assetManagerFactory.deployContract();

        // Initialize AssetManager
        const { transactionResult } = await AssetManager.initialize(
            assetManager.id.toString(),
            PROVIDER.url,
            OWNER.privateKey
        );
        const { transactionResult: result } = await AssetManager.addAsset(
            assetManager.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            BaseAssetId
        );
        expect(transactionResult.isStatusSuccess).toBeTruthy();
        expect(result.isStatusSuccess).toBeTruthy();
    });

    it('should initialize', async () => {
        const { transactionResult } = await Pool.initialize(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            EXCHANGE,
            assetManager.id.toB256()
        );
        expect(transactionResult.isStatusSuccess).toBeTruthy();
    });

    it('should not initialize again', async () => {
        await expect(async () => {
            await Pool.initialize(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                EXCHANGE,
                assetManager.id.toB256()
            )
        }).rejects.toThrow();
    });

    it('should deposit', async () => {
        const { value: totalSupply } = await Pool.totalSupply(
            contract.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        const { value: balance } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.address.toB256(),
            BaseAssetId
        );
        expect(Number(totalSupply)).toBe(0);
        expect(Number(balance)).toBe(0);

        const { transactionResult: result } = await Pool.deposit(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            100,
            BaseAssetId,
            assetManager.id.toB256()
        );
        expect(result.isStatusSuccess).toBeTruthy();

        const { value: postTotalSupply } = await Pool.totalSupply(
            contract.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        const { value: postBalance } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.address.toB256(),
            BaseAssetId
        );
        expect(Number(postTotalSupply)).toBe(100);
        expect(Number(postBalance)).toBe(100);

        const { transactionResult: resultUser } = await Pool.deposit(
            contract.id.toString(),
            PROVIDER.url,
            USER.privateKey,
            100,
            BaseAssetId,
            assetManager.id.toB256()
        );
        expect(resultUser.isStatusSuccess).toBeTruthy();

        const { value: postTotalSupply2 } = await Pool.totalSupply(
            contract.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        const { value: postBalanceUser } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            USER.address.toB256(),
            BaseAssetId
        );
        expect(Number(postTotalSupply2)).toBe(200);
        expect(Number(postBalanceUser)).toBe(100);
    });

    it('should not deposit non-supported asset', async () => {
        const { transactionResult: result } = await AssetManager.removeAsset(
            assetManager.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            BaseAssetId
        );
        expect(result.isStatusSuccess).toBeTruthy();

        await expect(async () => {
            await Pool.deposit(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                100,
                BaseAssetId,
                assetManager.id.toB256()
            )
        }).rejects.toThrow();
    });

    it('should not withdraw higher than balance', async () => {
        await expect(async () => {
            await Pool.withdraw(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                101,
                BaseAssetId,
                assetManager.id.toString()
            )
        }).rejects.toThrow();
    });

    it('should not withdraw non-supported asset', async () => {
        const { value } = await AssetManager.isAssetSupported(
            assetManager.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        expect(value).toBeFalsy();

        await expect(async () => {
            await Pool.withdraw(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                100,
                BaseAssetId,
                assetManager.id.toString()
            )
        }).rejects.toThrow();
    });

    it('should withdraw', async () => {
        const { transactionResult: result } = await AssetManager.addAsset(
            assetManager.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            BaseAssetId
        );
        expect(result.isStatusSuccess).toBeTruthy();

        const { transactionResult } = await Pool.withdraw(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            100,
            BaseAssetId,
            assetManager.id.toString()
        );
        expect(transactionResult.isStatusSuccess).toBeTruthy();

        const { value: totalSupply } = await Pool.totalSupply(
            contract.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        const { value: balance } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.address.toB256(),
            BaseAssetId
        );
        expect(Number(totalSupply)).toBe(100);
        expect(Number(balance)).toBe(0);
    });

    it('should withdraw all', async () => {
        const { value: preBalance } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            USER.address.toB256(),
            BaseAssetId
        );
        expect(Number(preBalance)).toBe(100);

        const { transactionResult: result } = await Pool.withdrawAll(
            contract.id.toString(),
            PROVIDER.url,
            USER.privateKey,
            assetManager.id.toB256()
        );
        expect(result.isStatusSuccess).toBeTruthy();

        const { value: totalSupply } = await Pool.totalSupply(
            contract.id.toString(),
            PROVIDER.url,
            BaseAssetId
        );
        const { value: balance } = await Pool.balanceOf(
            contract.id.toString(),
            PROVIDER.url,
            USER.address.toB256(),
            BaseAssetId
        );
        expect(Number(totalSupply)).toBe(0);
        expect(Number(balance)).toBe(0);
    });

    it('should not be callable by non-exchange', async () => {
        await expect(async () => {
            await Pool.transferFrom(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                OWNER.address.toB256(),
                USER.address.toB256(),
                BaseAssetId,
                100
            )
        }).rejects.toThrow();
    });

    it('should not be callable by non-owner', async () => {
        await expect(async () => {
            await Pool.setAssetManager(
                contract.id.toString(),
                PROVIDER.url,
                USER.privateKey,
                ASSET
            )
        }).rejects.toThrow();
    });

    it('should set asset manager', async () => {
        const { transactionResult } = await Pool.setAssetManager(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            ASSET
        );
        expect(transactionResult.isStatusSuccess).toBeTruthy();

        const { value } = await Pool.getTransferManager(
            contract.id.toString(),
            PROVIDER.url
        );
        expect(value.value).toBe(ASSET);
    });
});

