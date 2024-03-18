import { getFuel } from "index";
import { useState, useEffect } from "react";

export const FuelConnectorName = "Fuel Wallet";

export function useFuel() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fuel, setFuel] = useState<any>(getFuel());

  async function handleConnector() {
    setIsLoading(true);
    if (!fuel) {
      setFuel(undefined);
      setError("Fuel Wallet is not installed!");
      setIsLoading(false);

      return;
    }

    try {
      const hasConnector = await fuel.hasConnector();

      // Extensions are disabled or not installed
      if (!hasConnector) {
        setFuel(undefined);
        setIsLoading(false);

        return;
      }

      const connectors = await fuel.connectors();

      if (connectors.length === 0) {
        setFuel(undefined);
        setError("Fuel Wallet is not installed!");
        setIsLoading(false);

        return;
      }

      const fuelConnector = connectors.find((item: any) => item.name === FuelConnectorName);

      if (!fuelConnector?.installed) {
        setFuel(undefined);
        setError("Fuel Wallet is not installed!");
        setIsLoading(false);

        return;
      }

      setError("");
      setIsLoading(false);
    } catch (error) {
      setFuel(undefined);
      setError("Fuel wallet error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleConnector();
  }, [fuel]);

  return [fuel, error, isLoading] as const;
}
