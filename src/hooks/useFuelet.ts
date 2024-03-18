import { getFuelet } from "index";
import { useEffect, useState } from "react";

export const FueletConnectorName = "Fuelet Wallet";

export function useFuelet() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fuelet, setFuelet] = useState<any>(getFuelet());

  async function handleConnector() {
    setIsLoading(true);
    if (!fuelet) {
      setFuelet(undefined);
      setError("Fuelet Wallet is not installed!");
      setIsLoading(false);

      return;
    }

    try {
      const hasConnector = await fuelet.hasConnector();

      // Extensions are disabled or not installed
      if (!hasConnector) {
        setFuelet(undefined);
        setIsLoading(false);

        return;
      }

      const connectors = await fuelet.connectors();

      if (connectors.length === 0) {
        setFuelet(undefined);
        setError("Fuelet Wallet is not installed!");
        setIsLoading(false);

        return;
      }

      const fueletConnector = connectors.find((item: any) => item.name === FueletConnectorName);

      if (!fueletConnector?.installed) {
        setFuelet(undefined);
        setError("Fuelet Wallet is not installed!");
        setIsLoading(false);

        return;
      }

      setError("");
      setIsLoading(false);
    } catch (error) {
      setFuelet(undefined);
      setError("Fuelet wallet error");
      setIsLoading(false);
    }
  }
  useEffect(() => {
    handleConnector();
  }, [fuelet]);

  return [fuelet, error, isLoading] as const;
}
