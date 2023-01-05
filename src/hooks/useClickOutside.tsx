import { useEffect } from "react";

export const useClickOutside = (ref: any, onCallback: () => void) => {
  useEffect(() => {
    const closeModal = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onCallback();
      }
    };
    document.body.addEventListener("mousedown", closeModal);

    return () => document.body.removeEventListener("mousedown", closeModal);
  }, [ref.current]);
};
