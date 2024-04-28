/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const globalWindow = typeof window !== "undefined" ? window : ({} as Window);

export function useCoinbase() {
  const [error, setError] = useState("");

  useEffect(() => {
    const onCoinbaseLoaded = () => {
      if (window.ethereum) {
        console.log("Ethereum support is available");
        if (window.ethereum.providers && window.ethereum.providers.find(({ isCoinbaseWallet }: any) => isCoinbaseWallet)) {
          console.log("Coinbase is active");
        } else {
          console.log("Coinbase is not available");
          setError("Coinbase is not installed");
        }
      } else {
        console.log("Ethereum support is not found");
      }
    };
    if (window.fuel) {
      onCoinbaseLoaded();
    } else {
      setError("Extension is not installed");
    }
    window.addEventListener("CoinbaseLoaded", onCoinbaseLoaded);

    return () => document.removeEventListener("CoinbaseLoaded", onCoinbaseLoaded);
  }, []);

  return [error] as const;
}
