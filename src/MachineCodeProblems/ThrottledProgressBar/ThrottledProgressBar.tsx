import { ProgressBar, ProgressBarRunner } from "@/MachineCodeProblems";
import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const ThrottledProgressBarStyles = styled.div`
  .action-button-wrapper {
    margin: 24px;
  }

  .progress-bars-wrapper {
    max-height: 200px;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IThrottledProgressBarProps {}

interface IProgressBarListState {}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  MAX_SIMULTANEOUS_PROGRESS_ALLOWED: 3,
};

/*
    ====================================================== [Template Component]======================================================
*/

export const ThrottledProgressBar: FC<
  IThrottledProgressBarProps
> = ({}: IThrottledProgressBarProps): ReactElement => {
  const [progressBarListState, setProgressBarListState] = useState<
    Array<IProgressBarListState>
  >([]);

  const [progressBarQueue, setProgressBarQueue] = useState<
    Array<IProgressBarListState>
  >([]);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      progressBarListState.length <= DEFAULTS.MAX_SIMULTANEOUS_PROGRESS_ALLOWED
    ) {
      setProgressBarListState((prev) => [...prev, prev.length + 1]);
    } else {
      setProgressBarQueue((prev) => [
        ...prev,
        prev.length + progressBarListState.length + 1,
      ]);
    }
  };

  const handleOnProgressComplete = () => {
    if (progressBarQueue.length) {

      const nextInQueue = progressBarQueue[0];
      let updatedQueue = [...progressBarQueue];
      updatedQueue.shift();

      setProgressBarListState((prev) => [...prev, nextInQueue]);
      setProgressBarQueue(updatedQueue);
    }
  };

  console.log(progressBarListState);

  return (
    <ThrottledProgressBarStyles>
      <div className="action-button-wrapper">
        <button onClick={handleAddClick}>Add Item to Queue</button>
      </div>
      <div className="progress-bars-wrapper">
        {progressBarListState.map((item, index) => {
          return (
            <ProgressBarRunner
              key={item}
              onComplete={handleOnProgressComplete}
            />
          );
        })}
      </div>
    </ThrottledProgressBarStyles>
  );
};
