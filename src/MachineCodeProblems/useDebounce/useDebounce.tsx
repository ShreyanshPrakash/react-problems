import { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

// const TemplateStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IuseDebounceProps {
  value: any;
  delay: number;
  callback?: (value: any) => void;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
    DELAY: 500,
  };

/*
    ====================================================== [useDebounce Hook]======================================================
*/

export const useDebounce: FC<IuseDebounceProps> = ({
  value,
  delay = DEFAULTS.DELAY,
  callback = () => {},
}: IuseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutInt = setTimeout(() => {
      setDebouncedValue(value);
      callback(value);
    }, delay);

    return () => {
      clearInterval(timeoutInt);
    };
  }, [value, delay]);

  return debouncedValue;
};
