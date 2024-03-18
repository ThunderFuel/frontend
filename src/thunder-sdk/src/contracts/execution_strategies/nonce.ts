import { getOrderNonceOfUser, getMakerOrderOfUser, isValidOrder, getMinOrderNonceOfUser } from "./execution_strategies";
import { WalletUnlocked } from "fuels"

const provider = "https://beta-5.fuel.network/graphql"

const getNonce = async () => {
    const OWNER = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const strategy = "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const buyer = "0xb4efddf66465900398d520b7e1033c87db70e65e9f9ea9a9fa092b7d733183f4"
    const { value } = await getOrderNonceOfUser(strategy, provider, OWNER, user, false);
    return Number(value)
}

const getMinNonce = async () => {
    const strategy = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await getMinOrderNonceOfUser(strategy, provider, user, false);
    return Number(value)
}

const isValid = async () => {
    const strategy = "0xfb692ed3f7410dc287d10e42efb2c4a2ed6c910c192237a8053bc977a5cd73e5"
    const auction = "0xb5ff24a8923a22d2d5680e43df9cfe157c73184c6d2c397d139b8efb417ee7af"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const user2 = "0x024f958dc96818da0ab0af6608b85b022aab83ba5be0764ca4c7eaa27ae26ab4"
    const { value } = await isValidOrder(strategy, provider, user, 50, false);
    return value
}

const getMakerOrder = async () => {
    const strategy = "0x903a69c7350170df05dfe4b7159a61bb5cf15923b98855162687b10a3c88223b"
    const OWNER = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const buyer = "0xb4efddf66465900398d520b7e1033c87db70e65e9f9ea9a9fa092b7d733183f4"
    const user2 = "0xde17819da267e599b28c3ebcef402f5cc25385451773896cbe5e9d802188ab4d"
    const { value } = await getMakerOrderOfUser(strategy, provider, OWNER, user, 1405, false);
    return [
        value?.token_id,
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