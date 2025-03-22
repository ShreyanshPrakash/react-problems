import { useState } from "react";
import styled from "styled-components";

const CounterStyles = styled.div`
  .button {
    background-color: #6c6cd9;
    border-radius: 8px;
  }
`;

export const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(0);

  const handleIncrement = () => {
    setCounterValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCounterValue((prev) => prev - 1);
  };

  return (
    <CounterStyles>
      <p>Counter : {counterValue}</p>
      <button className="button increment-button" onClick={handleIncrement}>
        Click to Increment
      </button>
      <button className="button decrement-button" onClick={handleDecrement}>
        Click to Decrement
      </button>
    </CounterStyles>
  );
};
