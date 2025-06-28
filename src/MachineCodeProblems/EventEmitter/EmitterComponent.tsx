// @ts-nocheck

import { useEvent } from "./useEvent";
import { useEffect, useRef } from "react";

export const EmitterComponent = () => {
  const isMounted = useRef(false);

  const { emit } = useEvent();

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    handleMount();
  }, []);

  const handleMount = () => {
    setTimeout(() => {
      emit("listen", 10);
    }, 2 * 1000);
  };

  return <div className="emitter-wrapper">Emitter</div>;
};
