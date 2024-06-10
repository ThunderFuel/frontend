import { isAssetSupported } from "./asset_manager"
import { Provider } from "fuels"

const testnet = "https://testnet.fuel.network/v1/graphql";
const assetManagerContract = "0xa6bb9d650a74f3c8ac0f6fdb0d97eefce5579fdd94891b9584559e23916c03ea"
const privateKey = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"

const isSupported = async () => {
    const provider = await Provider.create(testnet)
    const baseAsset = provider.getBaseAssetId();
    const res = await isAssetSupported(assetManagerContract, testnet, privateKey, baseAsset)
    console.log(res)
}

isSupported()
    .then((res) => { return res })
    .catch((err) => console.log(err));
