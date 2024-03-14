import { Address, Provider, WalletUnlocked } from 'fuels';

const main = async (addr: string) => {
    const a = Address.fromB256(addr)
    return a.toAddress()
}

const owner = async() => {
    const provider = await Provider.create("https://beta-5.fuel.network/graphql")
    const b = new WalletUnlocked("0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c", provider)
    return b.address.toAddress()
}

// main("0xfb7fc3829b13b134c3ec0431fb5ce5536f79e4872d4f83ba184045f64b5a9de3")
//     .then((res) => {
//         console.log(res)
//     })

owner()
.then((res) => {
    console.log(res)
})