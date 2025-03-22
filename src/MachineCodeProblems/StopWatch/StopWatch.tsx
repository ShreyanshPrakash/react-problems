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
  template: string;
  constructor() {
    this.isRunning = false;
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.milliSeconds = 0;
    this.template = "";
  }
}

/*
    ====================================================== [Util Methods]======================================================
*/

const handleTimeProcessing = (startTime: number) => {
  const date = new Date();

  const currentTime = date.getTime();
  const timeElapsed = currentTime - startTime;

  const diffTime = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hrs, 30 mins, 0 secs 1970
  const newDate = new Date(timeElapsed - diffTime);

  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  const sec = newDate.getSeconds();
  const milliSeconds = newDate.getMilliseconds();

  const padHour = String(hour).padStart(2, "00");
  const padMin = String(min).padStart(2, "00");
  const padSec = String(sec).padStart(2, "00");
  const padMillSeconds = String(milliSeconds).padStart(2, "00");

  const template = `${padHour} : ${padMin} : ${padSec}`;

  return {
    hour,
    min,
    sec,
    milliSeconds,
    template,
  };
};

const handleTimeProcessingUsingTimeDiff = (startTime: number) => {
  let noOfDays = 0;
  const date = new Date();

  const currentTime = date.getTime() - noOfDays * (24 * 60 * 60 * 1000);
  const timeElapsed = currentTime - startTime;

  const hour = Math.floor(timeElapsed / (60 * 60 * 1000));
  const min = Math.floor(timeElapsed / (60 * 1000) % 60);
  const sec = Math.floor(timeElapsed / 1000 % 60);
  const milliSeconds = Math.floor(timeElapsed / 1);

  const padHour = String(hour).padStart(2, "00");
  const padMin = String(min).padStart(2, "00");
  const padSec = String(sec).padStart(2, "00");
  const padMillSeconds = String(milliSeconds).padStart(2, "00");

  const template = `${padHour} : ${padMin} : ${padSec}`;

  const isHourEquals24 = Math.floor(hour / 24) >= 0;
  if (isHourEquals24) {
    noOfDays++;
  }

  return {
    hour,
    min,
    sec,
    milliSeconds,
    template,
  };
};

/*
    ====================================================== [StopWatch Component]======================================================
*/

export const StopWatch = () => {
  const [timeState, setTimeState] = useState<TimeStateModel>(
    new TimeStateModel()
  );
  const setIntervalInstRef = useRef<any>(null);
  const timerStartTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => clearInterval(setIntervalInstRef.current);
  }, []);

  const startStopWatch = (): ReturnType<typeof setInterval> => {
    const intervalInst = setInterval(() => {
      const result = handleTimeProcessingUsingTimeDiff(timerStartTimeRef.current);
      setTimeState((prev) => ({
        ...prev,
        ...result,
      }));
    }, 1 * 1000);
    return intervalInst;
  };

  const handleStartTimer = () => {
    timerStartTimeRef.current = new Date().getTime();
    const result = handleTimeProcessingUsingTimeDiff(timerStartTimeRef.current);
    setTimeState((prev) => ({ ...prev, isRunning: true, ...result }));
    const intervalInst = startStopWatch();
    setIntervalInstRef.current = intervalInst;
  };

  const handleStopTimer = () => {
    clearInterval(setIntervalInstRef.current);
    setIntervalInstRef.current = null;
  };

  const handleResetTimer = () => {
    clearInterval(setIntervalInstRef.current);
    setIntervalInstRef.current = null;
    setTimeState(new TimeStateModel());
  };

  return (
    <StopWatchStyles>
      {/* <div className="time-wrapper">
        <ElementStyle>{timeState?.hour}</ElementStyle>
        <ElementStyle>{timeState?.min}</ElementStyle>
        <ElementStyle>{timeState?.sec}</ElementStyle>
      </div> */}
      <ElementStyle className="time-wrapper-pad">
        {timeState.template}
      </ElementStyle>
      <div className="action-buttons-wrapper">
        <button onClick={handleStartTimer} disabled={timeState.isRunning}>
          Start Timer
        </button>
        <button onClick={handleStopTimer} disabled={!timeState.isRunning}>
          Stop Timer
        </button>
        <button onClick={handleResetTimer} disabled={!timeState.isRunning}>
          Reset Timer
        </button>
      </div>
    </StopWatchStyles>
  );
};
