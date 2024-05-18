import { BigNumberish, Script, WalletUnlocked, Provider, Contract, WalletLocked } from "fuels"
import { mint, bulkMint, bulkMintScript, bulkMintWithMulticall } from "./erc721"
import { NFTContractAbi__factory } from "../../types/erc721/factories/NFTContractAbi__factory";
import bytecode from "../../scripts/bulk_mint/binFile";
import abi from "../../scripts/bulk_mint/out/bulk_mint-abi.json";

const nfts = [
    "0xf32598dd721c22a8de733787261fac218a33f989ae05616b15d7612de37cdfe7",
    "0x9eae614c5393a46c27204b639e8672442c6b845165940e299ac8e5c37668fd97",
    "0xd1f024422f806d021199f2286d52068715439a4af750085dcdf045c767b17203",
    "0x1b2add35516a0895d4c59e05f196165da272dcb9d32ca4dcd3f2cf2453a20e73",
    "0x89feaa70cb271f5dcf4af504ba5e592db9caf0e4fcf807f15fdb48d10c5b9e82",
    "0x9a66ccd6ed81fa5e1b1d2a1df2643f01240c5c8ca1b98732cc320b928573b65c",
    "0x59ec40eb701778acdb911a019e91bd29ce5436e0485d7b412e352931efefa366",
    "0xc7ff410ef10f5162ceebb3999e18ffff0657ce909b342e4f27292b2b4ae040a2",
    "0x039a7cb658abf2c71bcbf3413d2b12b1cf7bd839de5457b6bc9b8da3808b25ea",
    "0xce6d6d599ac50de590dd9b9a13a28463319403718444fb5d358676521833595b",
    "0xdade4a9ef8ec3a38d10823c539dba9ca1cc07e90138be2ab971892f2c2bc552a",
    "0xf00fbcb8adcbbe642edc9b1a2df3fd3798157c3af7e40c1ae73bd0def362f220",
    "0x3b24330bd1e1354ea0c14948d0e58334b9921c28a0394e26d2f26054e024c662",
]

type ContractIdInput = { value: string };
type AddressInput = { value: string };
type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
type Enum<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const singleMint = async (collection: string) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"

    const res = await mint(collection, testnet.url, privateKey, 1, 272, to)
    console.log(res.transactionResult.isStatusSuccess)
}

const mintNFTs = async (collection: string, amount: BigNumberish) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");

    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const wallet = new WalletUnlocked(privateKey, testnet);
    const script = new Script(bytecode, abi, wallet);

    const _contract = new Contract(collection, NFTContractAbi__factory.abi, testnet);
    const _collection: ContractIdInput = { value: collection };
    const _to: IdentityInput = { Address: { value: to } };

    const res = await script.functions
        .main(_collection, _to, amount)
        .txParams({gasPrice: 1})
        .addContracts([_contract])
        .call();
    return res.value
}

const mintNFTs2 = async (collection: string, amount: number, n: number) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");

    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"

    for (let i=0; i<n; i++) {
        const res = await bulkMintWithMulticall(collection, testnet.url, privateKey, to, amount);
        console.log(res?.transactionResult.isStatusSuccess)
        await sleep(5000);
    }
}

const mintNFTs3 = async (collection: string, amount: number, n: number) => {
    const testnet = await Provider.create("https://beta-5.fuel.network/graphql");

    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const wallet = new WalletUnlocked(privateKey, testnet);
    //let startIndex = 180 // next time 270

    for (let i=0; i<n; i++) {
        const res = await bulkMintScript(collection, testnet.url, wallet, to, amount);
        console.log(res?.transactionResult.isStatusSuccess)
        await sleep(2500);
    }
}

mintNFTs2(
    nfts[11],
    100,
    3
)
