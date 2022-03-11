import { useEffect, useRef } from "react";

export function useInterval(callback: any, delay: number | null) {
  const intervalRef = useRef<any>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = setInterval(tick, delay);
      return () => clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}
