import fs from 'fs';
import { Contract, ContractFactory, Provider, WalletUnlocked } from 'fuels';
import path from 'path';
import { TransferSelectorAbi__factory } from "../../types/transfer_selector/factories/TransferSelectorAbi__factory";
import * as TransferSelector from './transfer_selector';

let contract: Contract

const PROVIDER = new Provider('http://127.0.0.1:4000/graphql');
const OWNER: WalletUnlocked = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", PROVIDER);
const USER: WalletUnlocked = new WalletUnlocked("0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd", PROVIDER);
const COLLECTION = "0x1230000000000000000000000000000000000000000000000000000000000abc";
const TM = "0x1000000000000000000000000000000000000000000000000000000000000abc";
const TM721 = "0x1234000000000000000000000000000000000000000000000000000000000abc";
const TM1155 = "0x1234500000000000000000000000000000000000000000000000000000000abc";
const ZERO_B256 = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe('TransferSelector', () => {
    beforeAll(async () => {
        // Deploy
        const bytecode = fs.readFileSync(path.join(__dirname, '../../../../contracts-v1/transfer_selector/out/debug/transfer_selector.bin'));
        const factory = new ContractFactory(bytecode, TransferSelectorAbi__factory.abi, OWNER);
        contract = await factory.deployContract();
    });

    it('should initialize', async () => {
        const { value } = await TransferSelector.getTransferManager721(
            contract.id.toString(),
            PROVIDER.url,
        );
        const res = await TransferSelector.getTransferManager1155(
            contract.id.toString(),
            PROVIDER.url,
        );
        expect(value).toBeUndefined();
        expect(res.value).toBeUndefined();

        const { transactionResult } = await TransferSelector.initialize(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            TM721,
            TM1155
        );
        expect(transactionResult?.status.type).toBe("success");

        const res1 = await TransferSelector.getTransferManager721(
            contract.id.toString(),
            PROVIDER.url,
        );
        const res2 = await TransferSelector.getTransferManager1155(
            contract.id.toString(),
            PROVIDER.url,
        );
        expect(res1.value?.value).toBe(TM721);
        expect(res2.value?.value).toBe(TM1155);
    });

    it('should get owner', async () => {
        const { value } = await TransferSelector.owner(contract.id.toString(), PROVIDER.url);
        expect(value?.Address?.value).toBe(OWNER.address.toB256());
    });

    it('should not initialize again', async () => {
        await expect(async () => {
            await TransferSelector.initialize(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                TM721,
                TM1155
            )
        }).rejects.toThrow();
    });

    it('should set and get transfer manager for erc721', async () => {
        const { transactionResult } = await TransferSelector.setTransferManager721(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            TM721,
        );
        expect(transactionResult.status.type).toBe("success");

        const { value } = await TransferSelector.getTransferManager721(
            contract.id.toString(),
            PROVIDER.url,
        );
        expect(value?.value).toBe(TM721);
    });

    it('should set and get transfer manager for erc1155', async () => {
        const { transactionResult } = await TransferSelector.setTransferManager1155(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            TM1155,
        );
        expect(transactionResult.status.type).toBe("success");

        const { value } = await TransferSelector.getTransferManager1155(
            contract.id.toString(),
            PROVIDER.url,
        );
        expect(value?.value).toBe(TM1155);
    });

    it('should not set zero contract address for erc721 and erc1155', async () => {
        await expect(async () => {
            await TransferSelector.setTransferManager721(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                ZERO_B256,
            )
        }).rejects.toThrow();

        await expect(async () => {
            await TransferSelector.setTransferManager1155(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                ZERO_B256,
            )
        }).rejects.toThrow();
    });

    it('should add transfer manager for collection', async () => {
        const { value } = await TransferSelector.getTransferManagerForToken(
            contract.id.toString(),
            PROVIDER.url,
            COLLECTION
        );
        expect(value).toBeUndefined();

        const { transactionResult } = await TransferSelector.addCollectionTransferManager(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            COLLECTION,
            TM
        );
        expect(transactionResult.status.type).toBe("success");

        const res = await TransferSelector.getTransferManagerForToken(
            contract.id.toString(),
            PROVIDER.url,
            COLLECTION
        );
        expect(res.value?.value).toBe(TM);
    });

    it('should get transfer manager for collection', async () => {
        const res = await TransferSelector.getTransferManagerForToken(
            contract.id.toString(),
            PROVIDER.url,
            COLLECTION
        );
        expect(res.value?.value).toBe(TM);
    });

    it('should not add the same transfer manager again', async () => {
        await expect(async () => {
            await TransferSelector.addCollectionTransferManager(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                COLLECTION,
                TM
            )
        }).rejects.toThrow();
    });

    it('should remove transfer manager for collection', async () => {
        const { transactionResult } = await TransferSelector.removeCollectionTransferManager(
            contract.id.toString(),
            PROVIDER.url,
            OWNER.privateKey,
            COLLECTION
        );
        expect(transactionResult.status.type).toBe("success");

        const { value } = await TransferSelector.getTransferManagerForToken(
            contract.id.toString(),
            PROVIDER.url,
            COLLECTION
        );
        expect(value).toBeUndefined();
    });

    it('should not remove non-added transfer manager', async () => {
        await expect(async () => {
            await TransferSelector.removeCollectionTransferManager(
                contract.id.toString(),
                PROVIDER.url,
                OWNER.privateKey,
                COLLECTION,
            )
        }).rejects.toThrow();
    });

    it('should not be callable by non-owner', async () => {
        await expect(async () => {
            await TransferSelector.setTransferManager721(
                contract.id.toString(),
                PROVIDER.url,
                USER.privateKey,
                TM721,
            )
        }).rejects.toThrow();

        await expect(async () => {
            await TransferSelector.setTransferManager1155(
                contract.id.toString(),
                PROVIDER.url,
                USER.privateKey,
                TM1155,
            )
        }).rejects.toThrow();

        await expect(async () => {
            await TransferSelector.addCollectionTransferManager(
                contract.id.toString(),
                PROVIDER.url,
                USER.privateKey,
                COLLECTION,
                TM
            )
        }).rejects.toThrow();

        await expect(async () => {
            await TransferSelector.removeCollectionTransferManager(
                contract.id.toString(),
                PROVIDER.url,
                USER.privateKey,
                COLLECTION,
            )
        }).rejects.toThrow();
    });
});
