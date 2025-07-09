import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface IBarProps {
  delay: number;
  start: boolean;
  onComplete?: () => void;
}

interface IBarItemStyleProps {
  delay: number;
}

const BarStyles = styled.div`
  box-sizing: border-box;

  .wrapper {
    height: 24px;
    width: 80vw;
    padding: 1px;

    background-color: white;
    border: 2px solid lightgray;
    border-radius: 16px;
  }
`;

const BarItem = styled.div<IBarItemStyleProps>`
  color: white;
  background-color: blue;
  height: 100%;
  border-radius: 16px;
  font-weight: bold;

  transform: scaleX(0);
  transform-origin: left;
  transition: transform ${({ delay }) => delay}ms linear;

  &.trigger-transition {
    transform: scaleX(1);
  }
`;

export const Bar: FC<IBarProps> = ({ delay, start, onComplete }) => {
  const [isTriggered, setIsTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (!start || isTriggered) {
      return;
    }

    setIsTriggered(true);
  }, [start]);

  return (
    <BarStyles>
      <div className="wrapper">
        <BarItem
          className={`bar ${isTriggered ? "trigger-transition" : ""}`}
          delay={delay}
          onTransitionEnd={onComplete}
        >
          {delay / 1000} sec(s)
        </BarItem>
      </div>
    </BarStyles>
  );
};
