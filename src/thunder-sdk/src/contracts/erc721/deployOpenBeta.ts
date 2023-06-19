import { readFileSync } from "fs";
import path from 'path';
import { Contract, ContractFactory, Provider, WalletUnlocked, NativeAssetId } from 'fuels';
import { OpenBetaNftAbi__factory } from "../../types/open_beta_nft/factories/OpenBetaNftAbi__factory";

import * as ERC721 from '../erc721';
import * as RoyaltyManager from '../royalty_manager';

const localTestnet = new Provider('http://127.0.0.1:4000/graphql');
const beta3Testnet = new Provider("https://beta-3.fuel.network/graphql");

const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", beta3Testnet);
const TM = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22";
const RM = "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e";

let openBeta: Contract;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async (provider: Provider) => {
    await deploy();
    await initialize(provider);
}

const deploy = async () => {
    const nftBytecode = readFileSync(path.join(__dirname, '../../bin-files/open_beta_nft.bin'));
    const nftFactory = new ContractFactory(nftBytecode, OpenBetaNftAbi__factory.abi, OWNER);

    openBeta = await nftFactory.deployContract({gasPrice: 1});
    console.log(`open beta contract id: ${openBeta.id.toB256()}`)
    await sleep(1500);
}

const initialize = async (provider: Provider) => {
    const { transactionResult: nft1Init } = await ERC721.initialize(
        openBeta.id.toB256(),
        provider.url,
        OWNER.privateKey,
        20000,
        TM
    );
    console.log(`open beta init: ${nft1Init.status.type}`)
    await sleep(1500);

    const { transactionResult: nft1RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        openBeta.id.toB256(),
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`open beta royalty registry: ${nft1RegisterRoyalty.status.type}`)
}

main(beta3Testnet)
    .then((res) => { return res })
    .catch((err) => console.log(err));
