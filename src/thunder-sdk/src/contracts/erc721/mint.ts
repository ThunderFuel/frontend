import { BigNumberish, WalletLocked } from "fuels/*"
import { mint, setApprovalForAll } from "./erc721"

const nft1 = "0x72f40d782c992e7df798e245e3b755636593a9b651f2c0324af538fa57bbace0"
const nft2 = "0xed5e40db7e1af0d7bdd1f131a365458fbc5666a20f57b1018669ebc8f40f54b0"
const nft3 = "0xfab6f7b1a166fa33e46084df2eeee545cc92565efc2b7edbaf040368048d0ff8"
const nft4 = "0x3cf27804d6a1c653dcce062b6f33937a815ee7ae7471787b3c0a661c22d45947"
const nft5 = "0x2cb6bf0e319ca6182f918a0ae76d740bf7af97b9b127a135468dff28b66b9342"
const nft6 = "0xbed9ac3a95cdc4e3c347a5cbd9bbc4c7bbf112fc7ac57c94a76563263429553a"
const nft7 = "0x80a7fa1d2410138f9381e7086259e891e386b32d7003992d8c70d3a379e3372f"
const nft8 = "0xe910e3a948e62db9c36bd2fe75c15b856e7cc11c09c7a8cece726534cdc1b9f0"
const nft9 = "0x4fea039b39737d00998a14078d6c1721f6b9eb1fac2d5893b3d2be22c7b13d6d"
const nft10 = "0x3023c0487ec0388563eaec5fdf1ef6705c1a5a241e855ba33d65677dbbbc3940"
const nft11 = "0x4ed76eb71af529fb5463bc7dfc2027029666c0b24fc5d4fa4c4c0cea86e94184"
const nft12 = "0xb64108ff2c8f2422a2ec079e4e42be028705e96f44bcbdf87cf2177a47e5e663"
const nft13 = "0x5e0d3b171d31260925ddf5025268a77c0419478801ff1f068e0249502b24f042"
const nft14 = "0x5fefadf4b0ec415717dc4fe2ce3f59814cff16747f384a0e1be70dced1f6248e"

const main = async (contractId: string, amount: BigNumberish) => {
    const provider = "https://beta-3.fuel.network/graphql"
    const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307"
    const wallet = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
    const { transactionResult } = await mint(contractId, provider, wallet, amount, to);
    return transactionResult.status.type
}

const approve = async (contractId: string) => {
    const provider = "https://beta-3.fuel.network/graphql"
    const okanWallet = "0xda095454134996e62333131a81b77794f3edca42036dff09a51ca72ab6ebc1d2"
    const okanWallet2 = "0x4e9f62e8c97d08266af1c554219d53696350a03b34dfbe2b4c86eb8493efb705"
    const tm = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22"

    const { transactionResult } = await setApprovalForAll(contractId, provider, okanWallet2, tm, true);
    return transactionResult.status.type
}

approve(nft13)
    .then((res) => console.log(`nft1: ${res}`))
    .catch((err) => console.log(err))


// approve(nft1, 1000)
//     .then((res) => console.log(`nft1: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft2, 1000)
//     .then((res) => console.log(`nft2: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft3, 1000)
//     .then((res) => console.log(`nft3: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft4, 1000)
//     .then((res) => console.log(`nft4: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft5, 1000)
//     .then((res) => console.log(`nft5: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft6, 1000)
//     .then((res) => console.log(`nft6: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft7, 1000)
//     .then((res) => console.log(`nft7: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft8, 1000)
//     .then((res) => console.log(`nft8: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft9, 1000)
//     .then((res) => console.log(`nft9: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft10, 1000)
//     .then((res) => console.log(`nft10: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft11, 1000)
//     .then((res) => console.log(`nft11: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft12, 1000)
//     .then((res) => console.log(`nft12: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft13, 1000)
//     .then((res) => console.log(`nft13: ${res}`))
//     .catch((err) => console.log(err))

// approve(nft14, 1000)
//     .then((res) => console.log(`nft14: ${res}`))
//     .catch((err) => console.log(err))
