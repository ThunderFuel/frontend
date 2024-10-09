
import { useFuel } from 'hooks/useFuel';

export const FueletConnectorName = "Fuelet Wallet";

// Fetched the exact same object as useFuel, but with a different name
export function useFuelet() {
const fuelData = useFuel();

return { fuelet: fuelData.fuel, error: fuelData.error, isLoading: fuelData.isLoading }

}
