import { bulkCancelOrder, BulkCancelOrderParam, setContracts, Contracts } from "./exchange";
import { Provider } from "fuels"

const bulkCancel = async (startNonce: number, endNonce: number) => {
    const exchange = "0xc5fbe89423bc290215a184f4e607e39340ef475b27f5b761fb9fa873bc937700"
    const provider ="https://beta-5.fuel.network/graphql";
    const strategy = "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f"
    const owner = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    let orders: BulkCancelOrderParam[] = []
    let contracts: Contracts;
    contracts = {
        pool: "0x8dad4bc41accf5c8a4d326ba513c7bccba075c4906ef1826f2cbf7409514a112",
        executionManager: "0x0bc0b9787481eea6bde1396600d1bc00a7e26018c9433d5a6c79fbe9e2d51aa1",
        royaltyManager: "0xf855df441b733d49ee9d738138ec38567fde35dbbb1ef08dac3c8e4f3e4a7908",
        assetManager: "0xe2591588f3dfaeb28053d6d509f16053272b9c58481bdd504dd7cb537a3504f0",
        strategyFixedPrice: "0x097dd0116aa8a47c8f243dfc9e523376ae015935441042d48d6ae6976738835f",
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

bulkCancel(0, 184)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
