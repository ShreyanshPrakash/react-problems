import { useEffect, useState } from "react";
import styled from "styled-components";

const DigitalClockStyles = styled.div`
  .time-wrapper {
    display: flex;
    gap: 24px;
  }
`;

const ElementStyle = styled.div`
  font-size: 160px;
`;

interface ITimeState {
  hour: number;
  min: number;
  sec: number;
  milliSeconds: number;
}

export const DigitalClock = () => {
  const [timeState, setTimeState] = useState<ITimeState>();

  useEffect(() => {
    const intervalInst = getNewTime();
    return () => clearInterval(intervalInst);
  }, []);

  const getNewTime = () => {
    const intervalInst = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      const milliSeconds = date.getMilliseconds();

      setTimeState({
        hour,
        min,
        sec,
        milliSeconds,
      });
    }, 1 * 1000);

    return intervalInst;
  };

  return (
    <DigitalClockStyles>
      <div className="time-wrapper">
        <ElementStyle>{timeState?.hour}</ElementStyle>
        <ElementStyle>{timeState?.min}</ElementStyle>
        <ElementStyle>{timeState?.sec}</ElementStyle>
      </div>
    </DigitalClockStyles>
  );
};
