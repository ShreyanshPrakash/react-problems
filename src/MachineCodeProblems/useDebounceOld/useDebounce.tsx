import { useThrottle } from "MachineCodeProblems/useDebounceOld/useThrottle";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const TemplateStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IuseDebounceProps {
  debounceDelay: number;
  callback: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  DEBOUNCE_DELAY: 2 * 1000,
};

/*
    ====================================================== [useDebounce Hook]======================================================
*/

export const useDebounceOld: FC<IuseDebounceProps> = ({
  callback = () => {},
  debounceDelay = DEFAULTS.DEBOUNCE_DELAY,
}: IuseDebounceProps): undefined => {
  const isDebounceTriggedRef = useRef<boolean>(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const paramnsRef = useRef<any>(null);

  useEffect(() => {}, []);

  const debounceHOF = (params: any, callback: (params: any) => void) => {
    paramnsRef.current = params;
    if (!isDebounceTriggedRef.current) {
      isDebounceTriggedRef.current = true;
      clearTimeout(timeoutRef.current);
      callback(paramnsRef.current);
    } else {
      if (timeoutRef.current) {
        return;
      }
      timeoutRef.current = setTimeout(() => {
        isDebounceTriggedRef.current = false;
        callback(paramnsRef.current);
      }, debounceDelay);
    }
  };

  return paramnsRef.current;
};

/*
    ====================================================== [Runner Component]======================================================
*/

export const DebounceRunnerOld: FC<IuseDebounceProps> = ({
  debounceDelay = DEFAULTS.DEBOUNCE_DELAY,
}: IuseDebounceProps): ReactElement => {
  const isDebounceTriggedRef = useRef<boolean>(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const valueRef = useRef<string | null>(null);
  const changeEventRef = useRef<React.ChangeEvent<HTMLInputElement> | null>(
    null
  );



  // Thye execution method that will be called
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    let value = event?.target?.value;
    console.log(value);
  };

  // This is the core logic
  const debounceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueRef.current = event.currentTarget.value;
    if (!isDebounceTriggedRef.current) {
      isDebounceTriggedRef.current = true;
      clearTimeout(timeoutRef.current);
      console.log(valueRef.current);
    } else {
      if (timeoutRef.current) {
        return;
      }
      timeoutRef.current = setTimeout(() => {
        isDebounceTriggedRef.current = false;
        console.log(valueRef.current);
      }, debounceDelay);
    }
  };

  // Created a HOF that can be used anywhere
  const debounceHOF = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (event: React.ChangeEvent<HTMLInputElement> | null) => void
  ) => {
    valueRef.current = event.currentTarget.value;
    changeEventRef.current = event;
    if (!isDebounceTriggedRef.current) {
      isDebounceTriggedRef.current = true;
      clearTimeout(timeoutRef.current);
      callback(changeEventRef.current);
    } else {
      if (timeoutRef.current) {
        return;
      }
      timeoutRef.current = setTimeout(() => {
        isDebounceTriggedRef.current = false;
        callback(changeEventRef.current);
      }, debounceDelay);
    }
  };

  return (
    <TemplateStyles>
      <div className="wrapper">
        <input
          type="text"
          onChange={(event) => debounceHOF(event, handleInputChange)}
        />
        <input type="text" onChange={debounceChange} />
      </div>
    </TemplateStyles>
  );
};



/*
    ====================================================== [Runner Component]======================================================
*/




export const Runner = () => {


    const [inputValue, setInputValue] = useState<string>("");





    return (
        <div>
            <input type="text" onChange={handleInputChange} />
        </div>
    )
}