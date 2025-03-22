import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const StopWatchStyles = styled.div`
  .time-wrapper {
    display: flex;
    gap: 24px;
  }
`;

const ElementStyle = styled.div`
  font-size: 160px;
`;

/*
    ====================================================== [Models and types]======================================================
*/

class TimeStateModel {
  isRunning: boolean;
  hour: number;
  min: number;
  sec: number;
  milliSeconds: number;
  constructor() {
    this.isRunning = false;
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.milliSeconds = 0;
  }
}

/*
    ====================================================== [Util Methods]======================================================
*/

const handleTimeProcessing = () => {
  const date = new Date();

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const milliSeconds = date.getMilliseconds();

  return {
    hour,
    min,
    sec,
    milliSeconds,
  };
};

/*
    ====================================================== [StopWatch Component]======================================================
*/

export const StopWatch = () => {
  const [timeState, setTimeState] = useState<TimeStateModel>(
    new TimeStateModel()
  );
  const setIntervalInst = useRef<any>(null);

  useEffect(() => {
    return () => clearInterval(setIntervalInst.current);
  }, []);

  const startStopWatch = (): ReturnType<typeof setInterval> => {
    const intervalInst = setInterval(() => {
      const result = handleTimeProcessing();
      setTimeState((prev) => ({
        ...prev,
        ...result,
      }));
    }, 1 * 1000);
    return intervalInst;
  };

  const handleStartTimer = () => {
    const result = handleTimeProcessing();
    setTimeState((prev) => ({ ...prev, isRunning: true, ...result }));
    const intervalInst = startStopWatch();
    setIntervalInst.current = intervalInst;
  };

  const handleResetTimer = () => {
    clearInterval(setIntervalInst.current);
    setIntervalInst.current = null;
    setTimeState(new TimeStateModel());
  };

  return (
    <StopWatchStyles>
      <div className="time-wrapper">
        <ElementStyle>{timeState?.hour}</ElementStyle>
        <ElementStyle>{timeState?.min}</ElementStyle>
        <ElementStyle>{timeState?.sec}</ElementStyle>
      </div>
      <div className="action-buttons-wrapper">
        <button onClick={handleStartTimer} disabled={timeState.isRunning}>
          Start Timer
        </button>
        <button onClick={handleResetTimer} disabled={!timeState.isRunning}>
          Reset Timer
        </button>
      </div>
    </StopWatchStyles>
  );
};
