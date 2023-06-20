import { BigNumberish, WalletLocked } from "fuels/*";
import { mint, setApprovalForAll } from "./erc721";

const nfts = [
  "0x985cfb25b18153750b51024e559670d093d81c97b22467a3cc849e211de055c3",
  "0xb96d28549d1a22f716c76abd7052171d554d0b84c4c492f5cadf3eb6273ffac1",
  "0x2027da4b620609162cae3e1f07802b0e59b1beff71269121395b27d652e20c10",
  "0x8f1441f609b02de2c367e1c8c785e89d0dca1bd6fc1e2eccb9e982bf905791ce",
  "0x7fdb57ceb8e72598fbccec06af601503840a3ed029a9dc5443dac76b998dc422",
  "0x1b8b36002a10f1bbadd21a37deaf56387d80c57ef5a082418706fe519d998ceb",
  "0xa52f7cf2641a2111b159dd4e5a693eb5789619893e7d6858c254f68ca9f77d68",
  "0x5f083b2c1618e850a217cad0e397f7668d2cf01fb80d3240dc40584c76ab348e",
  "0x84b0f13be0a36c063f13551cffbfd369b52f760045d0b2f7dd2a1f6d7a281ad3",
  "0xc89c1755844c41da1382e2138d2d5ec962924b7647bbef065768cc480fd77a84",
  "0x68b801425c556a76a7248f3708b4be7f3b3f1d1c289fa438f560c90b03dedf2a",
  "0x99248fef2f354594d4d4b90f0edecddc3b548dec6cf77238d238bc57f6caa18f",
  "0x5ef5f55ce97eaf1c861af2b92f6b2ae16fc3754cc1daeef276f9f1af084cfc0f",
  "0xb7310b2b00e8ebaaea73cbe8304c5216df2471d551a7cf1d5c84bbf0de932e63",
];

const mintNFTs = async (contractId: string, amount: BigNumberish) => {
  const provider = "https://beta-3.fuel.network/graphql";
  const to = "0x833ad9964a5b32c6098dfd8a1490f1790fc6459e239b07b74371607f21a2d307";
  const wallet = "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c";
  const { transactionResult } = await mint(contractId, provider, wallet, amount, to, false);
  return transactionResult.status.type;
};

const approve = async (contractId: string) => {
  const provider = "https://beta-3.fuel.network/graphql";
  const okanWallet = "0xda095454134996e62333131a81b77794f3edca42036dff09a51ca72ab6ebc1d2";
  const okanWallet2 = "0x4e9f62e8c97d08266af1c554219d53696350a03b34dfbe2b4c86eb8493efb705";
  const tm = "0x44f93062f0e8ce54973a1c9fe972a25e3845a798adf892059bfe67c3576a1f22";

  const { transactionResult } = await setApprovalForAll(contractId, provider, okanWallet2, tm, true);
  return transactionResult.status.type;
};

const main = async () => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const failed: string[] = [];

  for (let i = 0; i < 14; i++) {
    const nftContractId = nfts[i];
    console.log("start");
    const res = await mintNFTs(nftContractId, 1000);
    console.log(res);
    if (res === "failure") {
      failed.push(nftContractId);
      continue;
    }
    await sleep(1500);
  }

  if (failed.length != 0) {
    for (let i = 0; i < failed.length; i++) {
      const nftContractId = failed[i];
      const res = await mintNFTs(nftContractId, 1000);
      if (res === "success") {
        const index = failed.indexOf(nftContractId);
        failed.splice(index, 1);
      }
      await sleep(1500);
    }

    if (failed.length == 0) return "success";
  } else {
    return "success";
  }

  return failed;
};

main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
