import { getOrderNonceOfUser } from "./execution_strategies"

const getNonce = async () => {
    const contractId = "0xcb7ffc0631242f4804df59aded3cd6374aee8c0f7cec6f1d584110c06cbb5569"
    const provider = "https://testnet.fuel.network/v1/graphql"
    const priv = "0xda095454134996e62333131a81b77794f3edca42036dff09a51ca72ab6ebc1d2"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const res = await getOrderNonceOfUser(contractId, provider, priv, user, false)
    console.log(Number(res.value))
}

getNonce();
