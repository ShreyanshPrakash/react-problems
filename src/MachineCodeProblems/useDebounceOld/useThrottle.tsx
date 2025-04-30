import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const useThrottleStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IuseThrottleProps {
  delay: number;
  changeValue: any;
  callback: (params: any) => void;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  DEBOUNCE_DELAY: 2 * 1000,
};

/*
    ====================================================== [Template Component]======================================================
*/

export const useThrottleOld: FC<IuseThrottleProps> = ({
  callback = () => {},
  changeValue,
  delay = DEFAULTS.DEBOUNCE_DELAY,
}: IuseThrottleProps): undefined => {
  const isDebounceTriggedRef = useRef<boolean>(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const paramnsRef = useRef<any>(null);

  const [throttledChangeValue, setThrottledChangeValue] =
    useState<any>(changeValue);

  useEffect(() => {
    throttle();
    return () => clearTimeoutTimer();
  }, [delay, changeValue]);

  const throttle = () => {
    // paramnsRef.current = changeValue;

    if (!isDebounceTriggedRef.current) {
      isDebounceTriggedRef.current = true;
      clearTimeoutTimer();

      callback(paramnsRef.current);
      setThrottledChangeValue(changeValue);
    } else {
      if (timeoutRef.current) {
        return;
      }
      timeoutRef.current = setTimeout(() => {
        isDebounceTriggedRef.current = false;
        callback(paramnsRef.current);

        setThrottledChangeValue(changeValue);
      }, delay);
    }
  };

  const clearTimeoutTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return throttledChangeValue;
};
