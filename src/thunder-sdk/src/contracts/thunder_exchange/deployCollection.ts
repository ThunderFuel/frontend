import { readFileSync } from "fs";
import path from 'path';
import { Contract, ContractFactory, Provider, WalletUnlocked, BaseAssetId } from 'fuels';
import { NFTContractAbi__factory } from "../../types/erc721/factories/NFTContractAbi__factory";

import * as RoyaltyManager from '../royalty_manager';

const testnet = "https://beta-5.fuel.network/graphql";

const RM = "0x724b473e23ccd22aa0962ecdfcde153cac877179b0af5cf9b48bf15f9389397b";

let nft: Contract;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const deploy = async () => {
    // Deploy NFT
    const provider = await Provider.create(testnet)
    const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", provider);
    const nftBytecode = readFileSync(path.join(__dirname, '../../bin-files/NFT-contract.bin'));
    const nftFactory = new ContractFactory(nftBytecode, NFTContractAbi__factory.abi, OWNER);

    nft = await nftFactory.deployContract({gasPrice: 1});
    console.log(nft.id.toB256())
    await sleep(1500);
}

// const initialize = async (provider: Provider) => {
//     const { transactionResult: nft3RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
//         RM,
//         provider.url,
//         OWNER.privateKey,
//         nft.id.toB256(),
//         OWNER.address.toB256(),
//         true,
//         500
//     );
//     console.log(`nft royalty registry: ${nft3RegisterRoyalty.isStatusSuccess}`)
//     await sleep(2000);
// }

const main = async (_provider: string, n: number) => {
    const provider = await Provider.create(_provider)
    for (let i=0; i<n; i++) {
        await deploy();
    }
    //await initialize(provider);
}

main(testnet, 14)
    .then((res) => { return res })
    .catch((err) => console.log(err));
