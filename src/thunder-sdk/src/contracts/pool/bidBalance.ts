import { balanceOf } from "./pool"
import { BaseAssetId } from "fuels"

const bidBalanceOf = async () => {
    const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const pool = "0xbb7bf2440bbf67e1a243388b521c80479e930d3280852da600225c7da94193d6"
    const provider = "https://beta-5.fuel.network/graphql"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const okanWallet2 = "0x07d91ae8c0a7b6228617da5711991f90cc5cd576cec69fbf77a154bbae6165ed"
    const user70331 = "0xde17819da267e599b28c3ebcef402f5cc25385451773896cbe5e9d802188ab4d"
    const { value } = await balanceOf(pool, provider, privateKey, user, BaseAssetId);
    return Number(value)
}

bidBalanceOf()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
