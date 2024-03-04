/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fuel, FuelConnector } from "@fuel-wallet/sdk";
import { useState, useEffect } from "react";

const globalWindow = typeof window !== "undefined" ? window : ({} as Window);

export function useFuel() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fuel, setFuel] = useState<any>();
  const _fuel = new Fuel();

  async function hasConnector() {
    const hasConnector = await _fuel.hasConnector();

    if (hasConnector) {
      setFuel(_fuel);
      setError("");
    } else setError("No connector found");
  }

  useEffect(() => {
    if (fuel) return;
    hasConnector();
    function handleConnector(currentConnector: FuelConnector) {
      setFuel(_fuel);
      setError("");
    }
    _fuel.on(_fuel.events.currentConnector, handleConnector);

    return () => {
      _fuel.off(_fuel.events.currentConnector, handleConnector);
    };
  }, [fuel]);

  return [fuel, error, isLoading] as const;
}
