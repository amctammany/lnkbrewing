import { useEffect, useRef } from "react";

export function useClickAway(listener: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickAway = (e: any) => {
      // Click inside Menu
      console.log(ref.current);
      console.log(e.target);
      if (ref.current?.contains(e.target)) return;
      listener();
    };
    document.addEventListener("click", handleClickAway, true);
    return () => document.removeEventListener("click", handleClickAway, true);
  });
  return ref;
}
