import { useEffect, useRef } from "react";

export const useCustomTimeout = (
  handler: Function,
  delay: number = 0,
  ...args: Array<any>
) => {
  const startTime = useRef(Date.now());
  const isStopped = useRef(true);
  const idleCallbackId = useRef<number>(-1);

  useEffect(() => {
    return () => {
      cancelIdleCallback(idleCallbackId.current);
    };
  }, []);

  const runTimer = () => {
    if (isStopped.current) {
      return;
    }
    const currentTime = Date.now();
    if (currentTime - startTime.current >= delay) {
      handler(...args);
    } else {
      idleCallbackId.current = requestIdleCallback(runTimer);
    }
  };

  const start = () => {
    isStopped.current = false;
    startTime.current = Date.now();
    idleCallbackId.current = requestIdleCallback(runTimer);
  };

  const stop = () => {
    isStopped.current = true;
  };

  const flush = () => {
    stop();
    handler(...args);
  };

  const pause = () => {
    stop();
  };

  return {
    start,
    pause,
    stop,
    flush,
  };
};
