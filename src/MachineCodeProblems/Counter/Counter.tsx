import { useSignal } from "@preact/signals-react";
import { MouseEvent, MouseEventHandler, useState } from "react";
import styled from "styled-components";

const CounterStyles = styled.div`
  .button {
    background-color: #6c6cd9;
    border-radius: 8px;
  }
`;

const buttonConfig = [
  {
    label: "+",
    name: "increment",
    classes: "button increment-button",
  },
  {
    label: "Reset",
    name: "reset",
    classes: "button reset-button",
  },
  {
    label: "-",
    name: "decrement",
    classes: "button decrement-button",
  },
];

export const Counter = () => {
  const [counterValue, setCounterValue] = useState<number>(0);
  let count = useSignal<number>(0);

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    const map: Record<string, any> = {
      increment: count.value + 1,
      decrement: count.value - 1,
      reset: 0,
    };
    count.value = map[name];
  };

  return (
    <CounterStyles>
      <p>Counter : {count}</p>
      {buttonConfig.map((config) => {
        const { label, name, classes } = config;
        return (
          <button
            key={label}
            className={classes}
            name={name}
            onClick={handleActionClick}
          >
            {label}
          </button>
        );
      })}
    </CounterStyles>
  );
};
