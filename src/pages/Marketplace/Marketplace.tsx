import React, { useEffect } from "react";
import MarketplaceList from "./MarketplaceList";
import Filter from "./Filter/index";
import MarketplaceProvider from "./MarketplaceContext";
import HotDropsV2 from "./HotDropsV2";
import { GoogleProvider } from "@lit-protocol/lit-auth-client";
import { ProviderType } from "@lit-protocol/constants";
import { authenticateWithDiscord, getPKPs, litAuthClient } from "lit-protocol/lit";
import userService from "api/user/user.service";
import { useDispatch } from "react-redux";
import { setAddress, setIsConnected, setUser } from "store/walletSlice";
import { useWallet } from "hooks/useWallet";
import { FUEL_TYPE } from "hooks/useFuelExtension";
import { ethRequestHandler, PKPEthersWallet } from "@lit-protocol/pkp-ethers";

import { ethers } from "ethers";
import { LitAbility, LitPKPResource } from "@lit-protocol/auth-helpers";
import useSession from "lit-protocol/useSession";
import Creator from "./Creator";
import Grids from "./Grids";
import Footer from "./Footer";

const config = {
  TEST_ENV: {
    litNetwork: "cayenne",
    debug: false,
    minNodeCount: 2,
  },
  test: {
    sendRealTxThatCostsMoney: false,
  },
  MNEUMONIC: "island arrow object divide umbrella snap essay seminar top develop oyster success",
  COSMOS_RPC: "https://cosmos-rpc.publicnode.com",
  CHRONICLE_RPC: "https://goerli.infura.io/v3/8d19847714014728b12c3e68a73fdf25",
  CHRONICLE_RPC_2: "https://lit-protocol.calderachain.xyz/http",
  RECIPIENT: "cosmos1jyz3m6gxuwceq63e44fqpgyw2504ux85ta8vma",
  DENOM: "uatom",
  AMOUNT: 1,
  DEFAULT_GAS: 0.025,
  AUTH_METHOD_ACCESS_TOKEN: "<your access token here>",
  CONTROLLER_PRIVATE_KEY: "f21d3fafe29fa10d26092ce4e91cd7108b734b98393f79b3c2cd04de24ca6817",
  CONTROLLER_ADDRESS: "0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37",
  PKP_TOKENID: "76782466186288095105667301754604586214815535829618018025889449690021181398503",
  PKP_PUBKEY: "0x04cd031eab884f380833d79bf6f7401d67b171597344f55bd36fffd5e1a5cb270c57a016db16d4ef79f16fe3be5a1947a8e9402a1a3ecf0b6675b68a78cf8dbb73",
  PKP_ETH_ADDRESS: "0x2BC5789Caa5De98a7bbcA299B6590baEB53d4F7f",
  PKP_COSMOS_ADDRESS: "cosmos1v8wr9cvhhy7n43vmyswp69akszdhqtuzh4pztf",
  PKP_SUI_ADDRESS: "0x8c0d831a2db7a71ba0d151f27e3a11349a45b5430eba956a65c9955db06d4e22",
  CONTROLLER_AUTHSIG: {
    sig: "0x137b66529678d1fc58ab5b340ad036082af5b9912f823ba22c2851b8f50990a666ad8f2ab2328e8c94414c0a870163743bde91a5f96e9f967fd45d5e0c17c3911b",
    derivedVia: "web3.eth.personal.sign",
    signedMessage:
      "localhost wants you to sign in with your Ethereum account:\n0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37\n\nTESTING TESTING 123\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: eoeo0dsvyLL2gcHsC\nIssued At: 2023-11-17T15:04:20.324Z\nExpiration Time: 2215-07-14T15:04:20.323Z",
    address: "0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37",
  },
  CONTROLLER_ADDRESS_2: "0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37",
  PKP_TOKENID_2: "17721897921193976077336024133272331792112731041238443667910728449433240332747",
  PKP_PUBKEY_2: "04863db2ece69acb897a07d367b833ebb29f7c4416edca34e8bedbd32252c0fbfa4779c22309dd94eed86601f6967e3792b06df33c072592355eb0045985f8e4b3",
  PKP_ETH_ADDRESS_2: "0x9fc386f8cd07631b42817996357e35F10aC04727",
  PKP_COSMOS_ADDRESS_2: "cosmos1853xq9ntk6hv69rvnmaxafssk6r40eemlyeqz0",
  PKP_SUI_ADDRESS_2: "0x71175cb41d82e5b28d8a4865ee934d2ed31eeb561d10f3c3a10cab5ac354b688",
  CONTROLLER_AUTHSIG_2: {
    sig: "0x017564beb9aaddd669a59ce7aa5f0d73effb4b501dad052813e6bf2bec8b88551399c14e883a4a7310d9a1e142aa3c7c738b5db388c98af4fc45d1cdad25cdc11b",
    derivedVia: "web3.eth.personal.sign",
    signedMessage:
      "localhost wants you to sign in with your Ethereum account:\n0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37\n\nTESTING TESTING 123\n\nURI: https://localhost/login\nVersion: 1\nChain ID: 1\nNonce: gOv4cHte0F8Bg59Mb\nIssued At: 2023-11-17T15:04:32.857Z\nExpiration Time: 2215-07-14T15:04:32.857Z",
    address: "0xeF71c2604f17Ec6Fc13409DF24EfdC440D240d37",
  },
};

const Marketplace = () => {
  const dispatch = useDispatch();
  const { walletConnectGateway } = useWallet();
  const queryString = new URLSearchParams(window.location.search);
  const id = queryString.get("id_token");
  const state = queryString.get("state");
  const provider = queryString.get("provider");

  // console.log(state, provider, id);

  const { initSession, sessionSigs } = useSession();

  useEffect(() => {
    if (provider === "discord") {
      authenticateWithDiscord("http://localhost:3000").then((authMethod: any) => {
        // mintPKP({
        //   authMethodType: AuthMethodType.Discord,
        //   accessToken: authMethod.accessToken,
        // });
        getPKPs(authMethod).then((pkps) => {
          console.log(pkps);
        });
      });

      return;
    }

    if (!id) return;
    const googleProvider = litAuthClient.initProvider<GoogleProvider>(ProviderType.Google, { redirectUri: "http://localhost:3000" });

    googleProvider.authenticate().then((authMethod) => {
      // console.log(authMethod);

      // mintPKP({
      //   authMethodType: 6,
      //   accessToken: authMethod.accessToken,
      // }).then(() => {
      //   getPKPs(authMethod).then((pkps) => {
      //     console.log(pkps);
      //   });
      // });

      getPKPs(authMethod).then((pkps) => {
        console.log(pkps);
        userService.userCreate({ walletAddress: pkps[pkps.length - 1].ethAddress }).then((res: any) => {
          const { walletAddress } = res.data;
          dispatch(setIsConnected(true));
          dispatch(setAddress(walletAddress));
          dispatch(setUser(res.data));
          walletConnectGateway(FUEL_TYPE.WAGMI_METAMASK, 3);
          // if (authMethod && pkps.length > 0) {
          //   initSession(authMethod, pkps[1]);
          // }
          googleProvider
            .getSessionSigs({
              pkpPublicKey: pkps[pkps.length - 1].publicKey,
              authMethod: authMethod,
              sessionSigsParams: {
                chain: "ethereum",
                resourceAbilityRequests: [
                  {
                    resource: new LitPKPResource("*"),
                    ability: LitAbility.PKPSigning,
                  },
                ],
              },
            })
            .then((res) => {
              console.log(res);
              const sessionSigs = res;
              // ==================== Setup ====================
              const pkpEthersWallet = new PKPEthersWallet({
                controllerSessionSigs: sessionSigs,
                pkpPubKey: config.PKP_PUBKEY,
                rpc: config.CHRONICLE_RPC,
              });
              pkpEthersWallet.init();
              // ==================== Test Logic ====================
              // Transaction to sign and send
              const from = config.PKP_ETH_ADDRESS;
              const to = config.PKP_ETH_ADDRESS;
              const gasLimit = ethers.BigNumber.from("21000");
              const value = ethers.BigNumber.from("0");
              const data = "0x";
              // pkp-ethers signer will automatically add missing fields (nonce, chainId, gasPrice, gasLimit)
              const tx = {
                from: from,
                to: to,
                gasLimit,
                value,
                data,
              };
              // eth_sendTransaction parameters
              // Transaction - Object
              // Reference: https://ethereum.github.io/execution-apis/api-documentation/#eth_sendTransaction
              let txRes;
              ethRequestHandler({
                signer: pkpEthersWallet,
                payload: {
                  method: "eth_sendTransaction",
                  params: [tx],
                },
              })
                .then((res) => {
                  console.log("ethrequesthandler:", res);
                  txRes = res;
                })
                .catch((err) => console.log(err));
            })
            .catch((e) => console.log(e));
        });
      });
    });
  }, [id]);

  return (
    <div className="flex flex-col gap-20 pb-20 lg:pb-16">
      {/*<HotDrops />*/}
      <HotDropsV2 />
      <MarketplaceProvider>
        <Filter />
        <MarketplaceList itemCount={10} />
      </MarketplaceProvider>
      <Creator />
      {/*<Partners />*/}
      <Grids />
      <Footer />
    </div>
  );
};

export default Marketplace;
