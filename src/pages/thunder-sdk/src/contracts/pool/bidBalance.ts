import { balanceOf } from "./pool"
import { BaseAssetId } from "fuels"

const bidBalanceOf = async () => {
    const pool = "0x4fd8c3335fcb9daf317a0a0bff373735cb0b73b297f657eced288174fe9b504c"
    const provider = "https://beta-3.fuel.network/graphql"
    const okanWallet2 = "0x07d91ae8c0a7b6228617da5711991f90cc5cd576cec69fbf77a154bbae6165ed"
    const { value } = await balanceOf(pool, provider, okanWallet2, BaseAssetId);
    return Number(value)
}

bidBalanceOf()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
