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

main("0xfd76a1daac884867f7e69d78d27f59f9a7f1a39bc4a55708f958e3a5f538733f")
    .then((res) => {
        console.log(res)
    })

// owner()
// .then((res) => {
//     console.log(res)
// })