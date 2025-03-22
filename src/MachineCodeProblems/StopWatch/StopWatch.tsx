import { StopWatchStateModel } from "@/MachineCodeProblems/StopWatch/StopWatch.model";
import { handleTimeProcessingUsingTimeDiff } from "@/MachineCodeProblems/StopWatch/StopWatch.utils";
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
    ====================================================== [StopWatch Component]======================================================
*/

export const StopWatch = () => {
  const [timeState, setTimeState] = useState<StopWatchStateModel>(
    new StopWatchStateModel()
  );
  const setIntervalInstRef = useRef<any>(null);
  const timerStartTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => clearInterval(setIntervalInstRef.current);
  }, []);

  const startStopWatch = (): ReturnType<typeof setInterval> => {
    const intervalInst = setInterval(() => {
      const result = handleTimeProcessingUsingTimeDiff(timerStartTimeRef.current);
      setTimeState((prev: StopWatchStateModel) => ({
        ...prev,
        ...result,
      }));
    }, 1 * 1000);
    return intervalInst;
  };

  const handleStartTimer = () => {
    timerStartTimeRef.current = new Date().getTime();
    const result = handleTimeProcessingUsingTimeDiff(timerStartTimeRef.current);
    setTimeState((prev: StopWatchStateModel) => ({ ...prev, isRunning: true, ...result }));
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
    setTimeState(new StopWatchStateModel());
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
