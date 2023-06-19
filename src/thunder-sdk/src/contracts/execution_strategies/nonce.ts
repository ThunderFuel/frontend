import { getOrderNonceOfUser, getMakerOrderOfUser, isValidOrder, getMinOrderNonceOfUser } from "./execution_strategies";

const getNonce = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0x152140c1afc85dc22ba6183a7369648e7acd6a66e60e9c933fa93cb473183799"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const user3 = "0xa192fe342e3296cb34294a1f62792040a718bae33ce9ef26d1de8377d6754e71"
    const user4 = "0x07d91ae8c0a7b6228617da5711991f90cc5cd576cec69fbf77a154bbae6165ed"
    const okanWallet2 = "0xb346333954b619ed21605663ba3713c77382e7efad8e27b872bf0ce9012bba95"
    const { value } = await getOrderNonceOfUser(strategy, provider, okanWallet2, true);
    return Number(value)
}

const getMinNonce = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0x152140c1afc85dc22ba6183a7369648e7acd6a66e60e9c933fa93cb473183799"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await getMinOrderNonceOfUser(strategy, provider, user2, false);
    return Number(value)
}

const isValid = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0x152140c1afc85dc22ba6183a7369648e7acd6a66e60e9c933fa93cb473183799"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await isValidOrder(strategy, provider, user, 1151, false);
    return value
}

const getMakerOrder = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0x152140c1afc85dc22ba6183a7369648e7acd6a66e60e9c933fa93cb473183799"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const user3 = "0xa192fe342e3296cb34294a1f62792040a718bae33ce9ef26d1de8377d6754e71"
    const user4 = "0x07d91ae8c0a7b6228617da5711991f90cc5cd576cec69fbf77a154bbae6165ed"
    const { value } = await getMakerOrderOfUser(strategy, provider, user, 1105, false);
    return [
        Number(value?.token_id),
        value?.start_time,
        value?.end_time,
        Number(value?.nonce),
        value?.collection.value,
        Number(value?.price)
    ]
}

getMakerOrder()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))