/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

const globalWindow = typeof window !== "undefined" ? window : ({} as Window);

export function useFuelet() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fuel, setFuel] = useState<Window["fuelet"]>(globalWindow.fuel);

  useEffect(() => {
    const onFueletLoaded = () => {
      setFuel(window.fuelet);
    };

    // If fuelet is already loaded, call the handler
    if (window.fuelet) {
      onFueletLoaded();
    }

    // Listen for the fueletLoaded event
    document.addEventListener("FueletLoaded", onFueletLoaded);

    return () => document.removeEventListener("FuelLoaded", onFueletLoaded);
  }, []);

  return [fuel as NonNullable<Window["fuelet"]>, error, isLoading] as const;
}
