import { useState } from "react";
import { Bar } from "./Bar";
import styled from "styled-components";

const ProgressBar2Styles = styled.div`
  .action-wrapper {
    margin: 24px 0px;

    display: flex;
    justify-content: center;
    gap: 18px;
  }

  .progress-bar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const CONCURRENT_PROGRESS_BARS = 3;

export const ProgressBar2 = () => {
  const [progressbarState, setProgressBarState] = useState<Array<number>>([]);
  const [completedBar, setCompletedBar] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  /*
    Action Methods
  */
  const handleAdd = () => {
    setProgressBarState((prev) => [...prev, prev.length + 1]);
  };

  const handleStart = () => {
    setStart(true);
  };

  const handleReset = () => {
    setProgressBarState([]);
  };

  /*
    Bar Methods
  */

  const handleBarComplete = () => {
    setCompletedBar((prev) => prev + 1);
  };

  const shouldStart = (itemIndex: number) => {
    if (!start || itemIndex > completedBar + CONCURRENT_PROGRESS_BARS) {
      return false;
    }

    return true;
  };

  return (
    <ProgressBar2Styles>
      <div className="action-wrapper">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="progress-bar-wrapper">
        {progressbarState.map((item: number) => {
          return (
            <Bar
              key={item}
              delay={item * 1000}
              start={shouldStart(item)}
              onComplete={handleBarComplete}
            />
          );
        })}
      </div>
    </ProgressBar2Styles>
  );
};
