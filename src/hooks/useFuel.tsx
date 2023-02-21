/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

const globalWindow = typeof window !== "undefined" ? window : ({} as Window);

export function useFuel() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fuel, setFuel] = useState<Window["fuel"]>(globalWindow.fuel);

  useEffect(() => {
    const onFuelLoaded = () => {
      setFuel(window.fuel);
    };
    if (window.fuel) {
      onFuelLoaded();
    } else {
      setError("Extension is not installed");
    }
    document.addEventListener("FuelLoaded", onFuelLoaded);

    return () => document.removeEventListener("FuelLoaded", onFuelLoaded);
  }, []);

  return [fuel as NonNullable<Window["fuel"]>, error, isLoading] as const;
}
