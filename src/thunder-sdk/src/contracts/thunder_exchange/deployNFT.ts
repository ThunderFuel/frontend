import { readFileSync } from "fs";
import path from 'path';
import { Contract, ContractFactory, Provider, WalletUnlocked, NativeAssetId } from 'fuels';
import { NFTAbi__factory } from "../../types/erc721/factories/NFTAbi__factory";

import * as ERC721 from '../erc721';
import * as RoyaltyManager from '../royalty_manager';

const localTestnet = new Provider('http://127.0.0.1:4000/graphql');
const beta3Testnet = new Provider("https://beta-3.fuel.network/graphql");

const OWNER = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", beta3Testnet);
const TM = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22";
const RM = "0x2a08b7c9a7133fa52a1505897975e0e5a6ff7cb385e16c0d551152de7ecca47e";

let nft1: Contract;
let nft2: Contract;
let nft3: Contract;
let nft4: Contract;
let nft5: Contract;
let nft6: Contract;
let nft7: Contract;
let nft8: Contract;
let nft9: Contract;
let nft10: Contract;
let nft11: Contract;
let nft12: Contract;
let nft13: Contract;
let nft14: Contract;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async (provider: Provider) => {
    //await deploy();
    await initialize(provider);
}

const deploy = async () => {
    // Deploy NFTs
    const nftBytecode = readFileSync(path.join(__dirname, '../../bin-files/NFT.bin'));
    const nftFactory = new ContractFactory(nftBytecode, NFTAbi__factory.abi, OWNER);

    console.log("start")

    nft1 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft1 contract id: ${nft1.id.toB256()}`)
    await sleep(1500);

    nft2 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft2 contract id: ${nft2.id.toB256()}`)
    await sleep(1500);

    nft3 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft3 contract id: ${nft3.id.toB256()}`)
    await sleep(1500);

    nft4 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft4 contract id: ${nft4.id.toB256()}`)
    await sleep(1500);

    nft5 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft5 contract id: ${0x7fdb57ceb8e72598fbccec06af601503840a3ed029a9dc5443dac76b998dc422}`)
    await sleep(1500);

    nft6 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft6 contract id: ${0x1b8b36002a10f1bbadd21a37deaf56387d80c57ef5a082418706fe519d998ceb}`)
    await sleep(1500);

    nft7 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft7 contract id: ${0xa52f7cf2641a2111b159dd4e5a693eb5789619893e7d6858c254f68ca9f77d68}`)
    await sleep(1500);

    nft8 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft8 contract id: ${0x5f083b2c1618e850a217cad0e397f7668d2cf01fb80d3240dc40584c76ab348e}`)
    await sleep(1500);

    nft9 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft9 contract id: ${0x84b0f13be0a36c063f13551cffbfd369b52f760045d0b2f7dd2a1f6d7a281ad3}`)
    await sleep(1500);

    nft10 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft10 contract id: ${0xc89c1755844c41da1382e2138d2d5ec962924b7647bbef065768cc480fd77a84}`)
    await sleep(1500);

    nft11 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft11 contract id: ${0x68b801425c556a76a7248f3708b4be7f3b3f1d1c289fa438f560c90b03dedf2a}`)
    await sleep(1500);

    nft12 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft12 contract id: ${nft12.id.toB256()}`)
    await sleep(1500);

    nft13 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft13 contract id: ${0x5ef5f55ce97eaf1c861af2b92f6b2ae16fc3754cc1daeef276f9f1af084cfc0f}`)
    await sleep(1500);

    nft14 = await nftFactory.deployContract({gasPrice: 1});
    console.log(`nft14 contract id: ${0xb7310b2b00e8ebaaea73cbe8304c5216df2471d551a7cf1d5c84bbf0de932e63}`)
    await sleep(1500);
}

const initialize = async (provider: Provider) => {
    // nft1 init
    // const { transactionResult: nft1Init } = await ERC721.initialize(
    //     nft1.id.toB256(),
    //     provider.url,
    //     OWNER.privateKey,
    //     10000,
    //     TM
    // );
    // console.log(`nft1 init: ${nft1Init.status.type}`)
    // await sleep(5000);

    // const { transactionResult: nft1RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
    //     RM,
    //     provider.url,
    //     OWNER.privateKey,
    //     nft1.id.toB256(),
    //     OWNER.address.toB256(),
    //     true,
    //     500
    // );
    // console.log(`nft1 royalty registry: ${nft1RegisterRoyalty.status.type}`)
    // await sleep(5000);

    // // nft2 init
    // const { transactionResult: nft2Init } = await ERC721.initialize(
    //     nft2.id.toB256(),
    //     provider.url,
    //     OWNER.privateKey,
    //     10000,
    //     TM
    // );
    // console.log(`nft2 init: ${nft2Init.status.type}`)
    // await sleep(5000);

    // const { transactionResult: nft2RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
    //     RM,
    //     provider.url,
    //     OWNER.privateKey,
    //     nft2.id.toB256(),
    //     OWNER.address.toB256(),
    //     true,
    //     500
    // );
    // console.log(`nft2 royalty registry: ${nft2RegisterRoyalty.status.type}`)
    // await sleep(5000);

    // nft3 init
    const { transactionResult: nft3Init } = await ERC721.initialize(
        "0x2027da4b620609162cae3e1f07802b0e59b1beff71269121395b27d652e20c10",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft3 init: ${nft3Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft3RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x2027da4b620609162cae3e1f07802b0e59b1beff71269121395b27d652e20c10",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft3 royalty registry: ${nft3RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft4 init
    const { transactionResult: nft4Init } = await ERC721.initialize(
        "0x8f1441f609b02de2c367e1c8c785e89d0dca1bd6fc1e2eccb9e982bf905791ce",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft4 init: ${nft4Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft4RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x8f1441f609b02de2c367e1c8c785e89d0dca1bd6fc1e2eccb9e982bf905791ce",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft4 royalty registry: ${nft4RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft5 init
    const { transactionResult: nft5Init } = await ERC721.initialize(
        "0x7fdb57ceb8e72598fbccec06af601503840a3ed029a9dc5443dac76b998dc422",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft5 init: ${nft5Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft5RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x7fdb57ceb8e72598fbccec06af601503840a3ed029a9dc5443dac76b998dc422",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft5 royalty registry: ${nft5RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft6 init
    const { transactionResult: nft6Init } = await ERC721.initialize(
        "0x1b8b36002a10f1bbadd21a37deaf56387d80c57ef5a082418706fe519d998ceb",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft6 init: ${nft6Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft6RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x1b8b36002a10f1bbadd21a37deaf56387d80c57ef5a082418706fe519d998ceb",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft6 royalty registry: ${nft6RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft7 init
    const { transactionResult: nft7Init } = await ERC721.initialize(
        "0xa52f7cf2641a2111b159dd4e5a693eb5789619893e7d6858c254f68ca9f77d68",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft7 init: ${nft7Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft7RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0xa52f7cf2641a2111b159dd4e5a693eb5789619893e7d6858c254f68ca9f77d68",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft7 royalty registry: ${nft7RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft8 init
    const { transactionResult: nft8Init } = await ERC721.initialize(
        "0x5f083b2c1618e850a217cad0e397f7668d2cf01fb80d3240dc40584c76ab348e",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft8 init: ${nft8Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft8RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x5f083b2c1618e850a217cad0e397f7668d2cf01fb80d3240dc40584c76ab348e",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft8 royalty registry: ${nft8RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft9 init
    const { transactionResult: nft9Init } = await ERC721.initialize(
        "0x84b0f13be0a36c063f13551cffbfd369b52f760045d0b2f7dd2a1f6d7a281ad3",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft9 init: ${nft9Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft9RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x84b0f13be0a36c063f13551cffbfd369b52f760045d0b2f7dd2a1f6d7a281ad3",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft9 royalty registry: ${nft9RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft10 init
    const { transactionResult: nft10Init } = await ERC721.initialize(
        "0xc89c1755844c41da1382e2138d2d5ec962924b7647bbef065768cc480fd77a84",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft10 init: ${nft10Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft10RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0xc89c1755844c41da1382e2138d2d5ec962924b7647bbef065768cc480fd77a84",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft10 royalty registry: ${nft10RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft11 init
    const { transactionResult: nft11Init } = await ERC721.initialize(
        "0x68b801425c556a76a7248f3708b4be7f3b3f1d1c289fa438f560c90b03dedf2a",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft11 init: ${nft11Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft11RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x68b801425c556a76a7248f3708b4be7f3b3f1d1c289fa438f560c90b03dedf2a",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft11 royalty registry: ${nft11RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft12 init
    const { transactionResult: nft12Init } = await ERC721.initialize(
        "0x99248fef2f354594d4d4b90f0edecddc3b548dec6cf77238d238bc57f6caa18f",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft12 init: ${nft12Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft12RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x99248fef2f354594d4d4b90f0edecddc3b548dec6cf77238d238bc57f6caa18f",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft12 royalty registry: ${nft12RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft13 init
    const { transactionResult: nft13Init } = await ERC721.initialize(
        "0x5ef5f55ce97eaf1c861af2b92f6b2ae16fc3754cc1daeef276f9f1af084cfc0f",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft13 init: ${nft13Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft13RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0x5ef5f55ce97eaf1c861af2b92f6b2ae16fc3754cc1daeef276f9f1af084cfc0f",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft13 royalty registry: ${nft13RegisterRoyalty.status.type}`)
    await sleep(5000);

    // nft14 init
    const { transactionResult: nft14Init } = await ERC721.initialize(
        "0xb7310b2b00e8ebaaea73cbe8304c5216df2471d551a7cf1d5c84bbf0de932e63",
        provider.url,
        OWNER.privateKey,
        10000,
        TM
    );
    console.log(`nft14 init: ${nft14Init.status.type}`)
    await sleep(5000);

    const { transactionResult: nft14RegisterRoyalty } = await RoyaltyManager.registerRoyaltyInfo(
        RM,
        provider.url,
        OWNER.privateKey,
        "0xb7310b2b00e8ebaaea73cbe8304c5216df2471d551a7cf1d5c84bbf0de932e63",
        OWNER.address.toB256(),
        true,
        500
    );
    console.log(`nft14 royalty registry: ${nft14RegisterRoyalty.status.type}`)
    await sleep(5000);
}

main(beta3Testnet)
    .then((res) => { return res })
    .catch((err) => console.log(err));
