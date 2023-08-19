/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

const globalWindow = typeof window !== "undefined" ? window : ({} as Window);

export function useMetamask() {
  const [error, setError] = useState("");
  //   const [metamask, setMetamask] = useState<Window["fuel"]>(globalWindow.ethereum);

  useEffect(() => {
    const onMetamaskLoaded = () => {
      if (window.ethereum) {
        console.log("Ethereum support is available");
        if (window.ethereum.isMetaMask) {
          console.log("MetaMask is active");
          //   setMetamask(window.ethereum);
        } else {
          console.log("MetaMask is not available");
        }
      } else {
        console.log("Ethereum support is not found");
      }
    };
    if (window.fuel) {
      onMetamaskLoaded();
    } else {
      setError("Extension is not installed");
    }
    window.addEventListener("MetamaskLoaded", onMetamaskLoaded);

    return () => document.removeEventListener("MetamaskLoaded", onMetamaskLoaded);
  }, []);

  return [error] as const;
}
