import { ReceiptLogDataCoder, ReceiptLogCoder, ByteArrayCoder, Coder } from "fuels"

const data =
`
    side: Side -> 16
    maker: Address -> 64
    collection: ContractId -> 64
    token_id: SubId -> 64
    price: u64 -> 16
    amount: u64 -> 16
    nonce: u64 -> 16
    strategy: ContractId -> 64
    payment_asset: AssetId -> 64
    start_time: u64 -> 16 4000000066055d5e
    end_time: u64 -> 16 40000000660951d
    extra_params: ExtraParams -> 64, 64, 16 (144)
`
const logData = () => {
    const coder = new ReceiptLogDataCoder();
    const arrayCoder = new ByteArrayCoder(1);
    const uintArray = arrayCoder.encode(data)
    const res = coder.decode(uintArray, 6)
    console.log(res)
}

logData();
