import { BigNumberish, Script, WalletUnlocked, Provider, Contract, WalletLocked } from "fuels"
import { mint, bulkMint } from "./erc721"
import { NFTContractAbi__factory } from "../../types/erc721/factories/NFTContractAbi__factory";
import bytecode from "../../scripts/bulk_mint/binFile";
import abi from "../../scripts/bulk_mint/out/bulk_mint-abi.json";

const nfts = [
    "0x64c592daf6e7d462e3b0e853d9d486637c4467e56bc98f796f69f646e0c29112",
    "0xc555e61a2bf170e0c936cce39dc9f74d5012fbe017590a22f87c8232bb250337",
    "0xe17eca5796410a89f2e58dcfccc092df277db7176b9dcd9462bfc18f7188086c",
    "0xf15033a55f2c30dc8c6b0c482e14529ce005ade7eff21026f788ecad9fd98a50",
    "0x3d43f31ab83880859271612119bdbd33a1e756fcac63bcdd9b009cd856cc7ea6",
    "0x98da9c4c4e92f1f33420364b24aff58b7663f2dbab6d7bac28a619bc6bd96ff7",
    "0x86542611da69927f60dbc60f37a202975464d0ab7965dad7c4c0ea641a6eb0e8",
    "0x2f8d573bd76aafe9faac42137183ffb087ded18e8ef981ce193b36f3e60e9e9a",
    "0x8f87508cd1c01cc48c73cfe42a678fec5134c98e94e36066ab7718fe7a28b10e",
    "0xbaf8441e4e6746bdeb34723ca1a313b251e7e9823e7cf22cfcbbf9da2d6723ae",
    "0x57ed061347e8ac94a5ff2a694bfecb50ad31e2bd5ee6dd66e54227b0b0f204bd",
    "0x8e5269dced2e4aecea155e04d9617c88b03d2f5d7b7571ac4b7e378e6a6feb32",
    "0x23125ecad3ecca99ecd31fe9cc22b3428d612df0d95c67ca892a58146854c31f",
    "0xf0921e06690cb421345151635fa55460d1b6d9682a5704cce3fe59a35ce38afd"
]

type ContractIdInput = { value: string };
type AddressInput = { value: string };
type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

const beta4Testnet = new Provider("https://beta-4.fuel.network/graphql");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mintNFTs = async (collection: string, amount: BigNumberish) => {
    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const wallet = new WalletUnlocked(privateKey, beta4Testnet);
    const script = new Script(bytecode, abi, wallet);

    const _contract = new Contract(collection, NFTContractAbi__factory.abi, beta4Testnet);
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
    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"

    let startIndex = 0

    for (let i=0; i<n; i++) {
        const res = await bulkMint(collection, beta4Testnet.url, privateKey, to, startIndex, amount);
        console.log(res?.transactionResult.isStatusSuccess)
        startIndex += 10
        await sleep(2000);
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
    "0x439c7e118889e1e9c56802ff4e5e14f9f4161ab85a233e8aa6758ad0c742dc74",
    10,
    5
)
.then((res) => console.log(res))
.catch((err) => console.log(err))

// main()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
