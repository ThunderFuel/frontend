import { Wallet, WalletUnlocked, CoinQuantity, Contract, Provider} from 'fuels';
import { totalSupply } from "./erc721"
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange/factories/ThunderExchangeAbi__factory"

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

const seller = async (address: string, assetId: string) => {
    const provider = await Provider.create("https://beta-5.fuel.network/graphql")
    const wallet = Wallet.fromAddress(address, provider);
    const balance = await wallet.getBalance(assetId);
    console.log(`Seller Balance: ${Number(balance)}`)
}

const buyer = async (address: string, assetId: string) => {
    const provider = await Provider.create("https://beta-5.fuel.network/graphql")
    const wallet = Wallet.fromAddress(address, provider);
    const balance = await wallet.getBalance(assetId);
    console.log(`Buyer Balance: ${Number(balance)}`)
}

const contract = async (id: string, assetId: string) => {
    const provider = await Provider.create("https://beta-5.fuel.network/graphql")
    const c = new Contract(id, ThunderExchangeAbi__factory.abi, provider)
    const balance = await c.getBalance(assetId);
    console.log(`Contract Balance: ${Number(balance)}`)
}

const totalSupplyOfNFT = async (contractId: string) => {
    const provider = await Provider.create("https://beta-5.fuel.network/graphql");
    const privateKey = "0xda095454134996e62333131a81b77794f3edca42036dff09a51ca72ab6ebc1d2"
    const res = await totalSupply(contractId, provider.url, privateKey)
    console.log(Number(res.value))
}

const assetId = "0x76ac224f9a09d0feb0a9d4ff6720beb3dededa6c0cdb371ca7e52cb85f92c1c2"

// seller(
//     "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307",
//     assetId
// )
// buyer(
//     "0xb4efddf66465900398d520b7e1033c87db70e65e9f9ea9a9fa092b7d733183f4",
//     "0x7f34ed8e9002a915199914fd62a24080eb65fcd9bd498c294222fbd030049abd"
// )
// contract(
//     "0xc5fbe89423bc290215a184f4e607e39340ef475b27f5b761fb9fa873bc937700",
//     assetId
// )

totalSupplyOfNFT(nfts[9])
