import { getOrderNonceOfUser } from "./execution_strategies";

const getNonce = async () => {
    const provider = "https://beta-3.fuel.network/graphql"
    const strategy = "0x152140c1afc85dc22ba6183a7369648e7acd6a66e60e9c933fa93cb473183799"
    const user = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const { value } = await getOrderNonceOfUser(strategy, provider, user, true);
    return value
}

getNonce()
    .then((res) => console.log(Number(res)))
    .catch((err) => console.log(err))