import { Provider, WalletUnlocked, WalletLocked, BigNumberish, Wallet } from "fuels";
const amount: BigNumberish = 11123123124
const zeroX = "0x";

const main = () => {
    const fill0 = amount.toString().padStart(64, "0")
    const res = fill0.padStart(66, zeroX)
    console.log(res)
}

const main2 = (
    startIndex: number,
    amount: number
) => {
    const subIDs = []
    for (let i=startIndex; i<(startIndex + amount); i++) {
        const fill0 = i.toString().padStart(64, "0")
        const stringSubId = fill0.padStart(66, zeroX)
        subIDs.push(stringSubId);
    }
    console.log(subIDs)
}

main2(0, 30);
