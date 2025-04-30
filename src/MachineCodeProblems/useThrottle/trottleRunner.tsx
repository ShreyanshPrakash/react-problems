import { useDebounce } from "@/MachineCodeProblems/useDebounce";
import { useThrottle } from "./useThrottle";
import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const ThrottleRunnerStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IThrottleRunnerProps {}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  DELAY: 500,
};

/*
    ====================================================== [ThrottleRunner Component]======================================================
*/

export const ThrottleRunner: FC<
IThrottleRunnerProps
> = ({}: IThrottleRunnerProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");



  const throttledInputValue = useThrottle({
    value: inputValue,
    delay: DEFAULTS.DELAY,
    callback: handleOnThrottle
  });

  const debouncedInputValue = useDebounce({
    value: inputValue,
    delay: DEFAULTS.DELAY,
    callback: handleOnThrottle
  });

  function handleOnThrottle(value: any){
    console.log(value);
  } 

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <ThrottleRunnerStyles>
      <input type="text" onChange={handleInputChange} />
      <div className="result-wrapper">
        <div>Input Value : {inputValue}</div>
        <div>Throttled Value : {throttledInputValue}</div>
        <div>Debounced Value : {debouncedInputValue}</div>
      </div>
    </ThrottleRunnerStyles>
  );
};
