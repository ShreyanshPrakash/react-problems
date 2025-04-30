import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const ProgressBarStyles = styled.div`
  box-sizing: border-box;
`;

const ProgressBarWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 16px;
  border-radius: 8px;
  padding: 1px;

  display: flex;
  align-items: center;
`;

const ProgressBarLoader = styled.div<IProgressBarLoaderProps>`
  background-color: ${({ color = "orange" }) => color};
  width: ${({ progress = "0%" }) => `${progress}%`};
  height: 100%;
  border-radius: 8px;
  align-self: center;

  transition: width 500ms linear;
`;

const ProgressBarRunnerStyles = styled.div`
  width: 80vw;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IProgressBarProps {
  progress: number;
}

interface IProgressBarLoaderProps {
  progress?: number;
  color?: string;
}

interface IProgressBarRunnerProps {
  onComplete: () => void;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  PROGRESS_UPDATE_INTERVAL: 0.1 * 1000,
};

/*
    ====================================================== [ProgressBar Component]======================================================
*/

export const ProgressBar: FC<IProgressBarProps> = ({
  progress,
}: IProgressBarProps): ReactElement => {
  return (
    <ProgressBarStyles>
      <ProgressBarWrapper>
        <ProgressBarLoader progress={progress} color="blue"></ProgressBarLoader>
      </ProgressBarWrapper>
    </ProgressBarStyles>
  );
};

/*
    ====================================================== [Runner Component]======================================================
*/

export const ProgressBarRunner: FC<IProgressBarRunnerProps> = ({
  onComplete = () => {},
}: IProgressBarRunnerProps) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<null | number>(null);

  useEffect(() => {
    const instance = setInterval(() => {
      setProgressPercentage((prev) => prev + 1);
    }, DEFAULTS.PROGRESS_UPDATE_INTERVAL);
    intervalRef.current = instance;
    return () => {
      clearInterval(instance);
    };
  }, []);

  useEffect(() => {
    if (progressPercentage >= 100 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsComplete(true);
      onComplete(); // maybe generate uuid and send to parent
    }
  }, [progressPercentage]);

  return (
    <ProgressBarRunnerStyles>
      <ProgressBar progress={progressPercentage} />
      {isComplete ? <div className="complete-text">Task Completed</div> : null}
    </ProgressBarRunnerStyles>
  );
};
