import { useRef, useLayoutEffect } from "react";

const preventDefault = e => e.preventDefault();

export const useNoScrollRef = () => {
  const ref = useRef();
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("touchmove", preventDefault, {
        passive: false
      });
      return ref.current.removeEventListener("toucmove", preventDefault);
    }
  }, [ref.current]);
  return ref;
};
