import { useFuel as useFuelContext } from "@fuels/react";
import { useQuery } from "@tanstack/react-query";

export const FuelConnectorName = "Fuel Wallet";

export function useFuel() {
  const { fuel } = useFuelContext();

  const {
    data: fuelData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fuelConnector", fuel],
    queryFn: async () => {
      if (!fuel) {
        throw new Error("Fuel Wallet is not installed!");
      }
      const hasConnector = await fuel.hasConnector();
      if (!hasConnector) {
        throw new Error("Fuel Wallet connector not available");
      }
      const connectors = await fuel.connectors();
      if (connectors.length === 0) {
        throw new Error("Fuel Wallet is not installed!");
      }
      const fuelConnector = connectors.find((item: any) => item.name === FuelConnectorName);
      if (!fuelConnector?.installed) {
        throw new Error("Fuel Wallet is not installed!");
      }

      return fuel;
    },
    retry: 3,
    refetchOnMount: true,
  });

  return { fuel: fuelData, error, isLoading } as const;
}
