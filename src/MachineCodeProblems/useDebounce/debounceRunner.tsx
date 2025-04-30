import { useDebounce } from "./useDebounce";
import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const DebounceRunnerStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IDebounceRunnerProps {}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  DELAY: 500,
};

/*
    ====================================================== [DebounceRunner Component]======================================================
*/

export const DebounceRunner: FC<
  IDebounceRunnerProps
> = ({}: IDebounceRunnerProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");

  const debouncedValue = useDebounce({
    value: inputValue,
    delay: DEFAULTS.DELAY,
    callback: handleOnDebounce,
  });

  function handleOnDebounce(value: any){
    console.log(value);
  } 

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <DebounceRunnerStyles>
      <input type="text" onChange={handleInputChange} />
      <div className="result-wrapper">
        <div>Input Value : {inputValue}</div>
        <div>Debounced Value : {debouncedValue}</div>
      </div>
    </DebounceRunnerStyles>
  );
};
