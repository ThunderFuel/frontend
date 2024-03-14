import { bulkCancelOrder, BulkCancelOrderParam, setContracts, Contracts } from "./exchange";
import { Provider } from "fuels"

const bulkCancel = async (startNonce: number, endNonce: number) => {
    const exchange = "0xfb7fc3829b13b134c3ec0431fb5ce5536f79e4872d4f83ba184045f64b5a9de3"
    const provider ="https://beta-5.fuel.network/graphql";
    const strategy = "0x903a69c7350170df05dfe4b7159a61bb5cf15923b98855162687b10a3c88223b"
    const owner = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    let orders: BulkCancelOrderParam[] = []
    let contracts: Contracts;
    contracts = {
        pool: "0xbb7bf2440bbf67e1a243388b521c80479e930d3280852da600225c7da94193d6",
        executionManager: "0xdde6e159794aa186ac7a6483072fcafe46ad9e64382047aa952ca05f6b5de7e2",
        royaltyManager: "0xb16fa86555ad029b8522dd3cc4fba9b2eea759ccdb04ed4cfdb33c9aeb4593d0",
        assetManager: "0xa75ab28ceb06c3b912fffa3252bd8420b19f81e24aceae48190c0dc6a1b47bd9",
        strategyFixedPrice: "0x903a69c7350170df05dfe4b7159a61bb5cf15923b98855162687b10a3c88223b",
        strategyAuction: "0x9b68a29813a329fa9c4d270a7c19081e369d332075ebb357a9fcb40824d88654",
    }
    const _provider = await Provider.create(provider)
    setContracts(contracts, _provider);

    for (let i=startNonce; i<=endNonce; i++) {
        const order: BulkCancelOrderParam = {
            strategy,
            nonce: i,
            isBuySide: false
        }
        orders.push(order);
    }

    const res = await bulkCancelOrder(exchange, provider, owner, orders)
    return res?.transactionResult.isStatusSuccess
}

bulkCancel(1900, 2000)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
