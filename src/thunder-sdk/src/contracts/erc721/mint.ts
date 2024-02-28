import { BigNumberish, Script, WalletUnlocked, Provider, Contract, WalletLocked } from "fuels"
import { mint, bulkMint } from "./erc721"
import { NFTContractAbi__factory } from "../../types/erc721/factories/NFTContractAbi__factory";
import bytecode from "../../scripts/bulk_mint/binFile";
import abi from "../../scripts/bulk_mint/out/bulk_mint-abi.json";

const nfts = [
    "0xb6ddceeb0aba222bb6384bd4fc26c8744e7aeed0a310fc8d22939a80bc21ba5a",
    "0x1ab17d22a61f44c2bb9a6dd203b969643ab0000c24752f006b997e8ff7d04b51",
    "0x83dd9cfa1e94119fbe86cf87a1dae2512569b52d628667a5d1307f48abc055bb",
    "0x848c5b8cd1b9f16d3993397d12f43368f8523aa06c8f154479c064ce49be0360",
    "0x22b73385b8540575c95de0ba66aec6b828b5dfd8e105a5ca55a7f6906f2f576b",
    "0xfa43ff6b090cc14b11a4ff103f2478dc6a66a0f25e40674cacf039b40a8bd268",
    "0x737b24549d6710a21ead349d6e94fcf1cb752a47f11d14ab5a96f7ccce23db22",
    "0x4941326770372032c516a2b2dbe9cb3240c9dff1c54de3e3236087737b2dceda",
    "0xc055509f28707a2071b354a4240d43514b26587f8788fc432caf85aa51b78e07",
    "0x617ff226ce12c85704f12a941c804507074295eb423f09f113a524c69eafb6fa",
    "0x8050db82991599d9410034d6faac2536f83553457561722ce9642d0dc524d2d7",
    "0x1fa01ce2c38d346dc934ba5c3c93e94b99df6c3bed7d91a893fc0ca959c3ddbe",
    "0x24b02ecf10c1acaaf93019a02fa200d8fd50baa0703bc6e5f22e72f0aa6b6bf0",
    "0xfa995d626b09e83074517d5a219f91e8b343f648f3b72726db23ac4be3bd07b7"
]

type ContractIdInput = { value: string };
type AddressInput = { value: string };
type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mintNFTs = async (collection: string, amount: BigNumberish) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");

    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const wallet = new WalletUnlocked(privateKey, testnet);
    const script = new Script(bytecode, abi, wallet);

    const _contract = new Contract(collection, NFTContractAbi__factory.abi, testnet);
    const _collection: ContractIdInput = { value: collection };
    const _to: IdentityInput = { Address: { value: to } };

    const { transactionResult } = await script.functions
        .main(_collection, _to, amount)
        .txParams({gasPrice: 1})
        .addContracts([_contract])
        .call();
    return transactionResult.isStatusSuccess;
}

const mintNFTs2 = async (collection: string, amount: number, n: number) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");

    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"

    let startIndex = 110 // next time 220

    for (let i=0; i<n; i++) {
        const res = await bulkMint(collection, testnet.url, privateKey, to, startIndex, amount);
        console.log(res?.transactionResult.isStatusSuccess)
        startIndex += 10
        await sleep(3000);
    }
}

// const main = async () => {
//     const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

//     const failed: string[] = [];

//     for (let i=0; i<14; i++) {
//         const nftContractId = nfts[i]
//         console.log("start")
//         const res = await mintNFTs2(nftContractId, 10);
//         console.log(res)
//         if (!res) {
//             failed.push(nftContractId);
//             continue
//         }
//         await sleep(1500);
//     }

//     if (failed.length != 0) {
//         for (let i=0; i<failed.length; i++) {
//             const nftContractId = failed[i]
//             const res = await mintNFTs2(nftContractId, 10);
//             if (!res) {
//                 const index = failed.indexOf(nftContractId);
//                 failed.splice(index, 1);
//             }
//             await sleep(1500);
//         }

//         if (failed.length == 0) return "success"
//     } else {
//         return "success"
//     }

//     return failed
// }

mintNFTs2(
    nfts[11],
    10,
    11
)
.then((res) => console.log(res))
.catch((err) => console.log(err))

// main()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
