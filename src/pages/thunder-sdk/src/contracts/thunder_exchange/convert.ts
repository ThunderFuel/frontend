import { Address } from 'fuels';

const main = async (addr: string) => {
    const a = Address.fromString(addr)
    return a.toB256()
}

main("fuel1svadn9j2tvevvzvdlk9pfy830y8uv3v7ywds0d6rw9s87gdz6vrsmedewm")
    .then((res) => {
        console.log(res)
    })