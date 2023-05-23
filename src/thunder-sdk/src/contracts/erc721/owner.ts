import { BigNumberish, NativeAssetId } from "fuels"
import { isApprovedForAll, ownerOf } from "./erc721"

const owner = async (collection: string, tokenId: BigNumberish) => {
    const provider = "https://beta-3.fuel.network/graphql"
    const { value } = await ownerOf(collection, provider, tokenId);
    return value
}

const isApproved = async (collection: string) => {
    const provider = "https://beta-3.fuel.network/graphql"
    const owner = "0x169ebe67287de6d8ba394a9f8b7580ef9dd324f431496c301c715c5911acea6b"
    const tm = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22"
    const { value } = await isApprovedForAll(collection, provider, NativeAssetId, tm);
    return value
}

owner("0x4fea039b39737d00998a14078d6c1721f6b9eb1fac2d5893b3d2be22c7b13d6d", 27)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
