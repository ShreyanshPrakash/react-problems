import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

// const useThrottleStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IuseThrottleProps {
  value: any;
  delay: number;
  callback?: (value: any) => void;
}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [useThrottle Component]======================================================
*/

export const useThrottle: FC<IuseThrottleProps> = ({
  value,
  delay,
  callback = () => {},
}: IuseThrottleProps) => {
  const [throttleValue, setThrottledValue] = useState();
  const lastExecutionTimeRef = useRef(new Date().getTime());

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (currentTime - lastExecutionTimeRef.current > delay) {
      setThrottledValue(value);
      callback(value);
      lastExecutionTimeRef.current = currentTime;
    }
  }, [value, delay]);

  return throttleValue;
};
