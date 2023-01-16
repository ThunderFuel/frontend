import { useEffect, useState } from "react";

const WIDTH = 1980;

export const useIsWideScreen = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= WIDTH);

  useEffect(() => {
    const handleWindowResize = () => setIsWideScreen(window.innerWidth >= WIDTH);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return isWideScreen;
};
