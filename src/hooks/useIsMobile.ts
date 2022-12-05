import { useState, useEffect } from "react";

const MOBILE_WIDTH = 1024;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);

  useEffect(() => {
    const handleWindowResize = () => setIsMobile(window.innerWidth < MOBILE_WIDTH);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return isMobile;
};
