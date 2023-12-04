import { getOrderNonceOfUser, getMakerOrderOfUser, isValidOrder, getMinOrderNonceOfUser } from "./execution_strategies";
import { WalletUnlocked } from "fuels"

const getNonce = async () => {
    const provider = "https://beta-4.fuel.network/graphql"
    const OWNER = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const strategy = "0xc0fa1c15c0f9807bb4e5654497202ffc419f029c3463329c55d098d3cd28584d"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const buyer = "0xb4efddf66465900398d520b7e1033c87db70e65e9f9ea9a9fa092b7d733183f4"
    const { value } = await getOrderNonceOfUser(strategy, provider, OWNER, buyer, false);
    return Number(value)
}

const getMinNonce = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await getMinOrderNonceOfUser(strategy, provider, user, false);
    return Number(value)
}

const isValid = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await isValidOrder(strategy, provider, user, 50, false);
    return value
}

const getMakerOrder = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5"
    const OWNER = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user5 = "0x7494d812e4e099ae2ce29c2b7c1f7e79f4ac434cc32091858087793943c97df8"
    const user6 = "0x095f6a3dd0734981d6a8ab91bddc21434c5ecbfa9a79d11f93bf63884573eae4"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const user3 = "0xa192fe342e3296cb34294a1f62792040a718bae33ce9ef26d1de8377d6754e71"
    const user4 = "0x07d91ae8c0a7b6228617da5711991f90cc5cd576cec69fbf77a154bbae6165ed"
    const { value } = await getMakerOrderOfUser(strategy, provider, OWNER, user6, 1, false);
    return [
        Number(value?.token_id),
        value?.start_time,
        value?.end_time,
        Number(value?.nonce),
        value?.collection.value,
        Number(value?.price)
    ]
}

getNonce()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))