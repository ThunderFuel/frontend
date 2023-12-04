import { Wallet, WalletUnlocked, CoinQuantity, Contract, Provider} from 'fuels';
import { ThunderExchangeAbi__factory } from "../../types/thunder_exchange/factories/ThunderExchangeAbi__factory"

const provider = new Provider("https://beta-4.fuel.network/graphql")

const seller = async (address: string, assetId: string) => {
    const wallet = Wallet.fromAddress(address, provider);
    const balance = await wallet.getBalance(assetId);
    console.log(`Seller Balance: ${Number(balance)}`)
}

const buyer = async (address: string, assetId: string) => {
    const wallet = Wallet.fromAddress(address, provider);
    const balance = await wallet.getBalance(assetId);
    console.log(`Buyer Balance: ${Number(balance)}`)
}

const contract = async (id: string, assetId: string) => {
    const c = new Contract(id, ThunderExchangeAbi__factory.abi, provider)
    const balance = await c.getBalance(assetId);
    console.log(`Contract Balance: ${Number(balance)}`)
}

seller(
    "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307",
    "0x7f34ed8e9002a915199914fd62a24080eb65fcd9bd498c294222fbd030049abd"
)
buyer(
    "0xb4efddf66465900398d520b7e1033c87db70e65e9f9ea9a9fa092b7d733183f4",
    "0x7f34ed8e9002a915199914fd62a24080eb65fcd9bd498c294222fbd030049abd"
)
contract(
    "0x2c52aff5c18dfb11ccbc5523f936addf884653116550ee36af37cae4b625ef2c",
    "0x7f34ed8e9002a915199914fd62a24080eb65fcd9bd498c294222fbd030049abd"
)
