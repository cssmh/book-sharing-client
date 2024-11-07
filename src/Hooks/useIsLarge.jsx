import { useState, useEffect } from "react";

const useIsLarge = () => {
  const [cart, SetCart] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        SetCart(4);
      } else {
        SetCart(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return cart;
};

export default useIsLarge;
