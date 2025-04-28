import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const CountdownTimerStyles = styled.div``;

const CountDownTimerClockStyles = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-around;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface ICountdownTimerProps {
  timerInputConfig?: Array<any>;
  multiplierConfig?: Record<string, number>;
}

interface ITimerInputConfigItem {
  name: string;
  field: string;
  placeholder: string;
}

interface ICountDownTimerStateModel {
  timerRunning: boolean;
  hour?: number;
  min?: number;
  sec?: number;
  ms?: number;
}

class CountDownTimerStateModel implements ICountDownTimerStateModel {
  timerRunning: boolean;
  hour: number;
  min: number;
  sec: number;
  ms: number;

  constructor() {
    this.timerRunning = false;
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.ms = 0;
  }
}

/*
    ====================================================== [Configs]======================================================
*/

const TIMER_INPUT_CONFIG: Array<ITimerInputConfigItem> = [
  {
    name: "hour",
    field: "hour",
    placeholder: "hour",
  },
  {
    name: "min",
    field: "min",
    placeholder: "min",
  },
  {
    name: "sec",
    field: "sec",
    placeholder: "sec",
  },
];

const TIMER_MULTIPLIER = {
  hour: 60 * 60 * 1000,
  min: 60 * 1000,
  sec: 1000,
};

const DEFAULT_CONFIGS = {
  CLOCK_INTERVAL_MS: 1 * 1000,

  TIMER_INPUT_CONFIG,
  TIMER_MULTIPLIER,
};

/*
    ====================================================== [CountdownTimer Component]======================================================
*/

export const CountdownTimer: FC<ICountdownTimerProps> = ({
  timerInputConfig = DEFAULT_CONFIGS.TIMER_INPUT_CONFIG,
  multiplierConfig = DEFAULT_CONFIGS.TIMER_MULTIPLIER,
}: ICountdownTimerProps): ReactElement => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const countdownTimeRef = useRef<number>(0);

  const [countDownTimerState, setCountDownTimerState] =
    useState<ICountDownTimerStateModel>(new CountDownTimerStateModel());

  /*
    Hooks
  */

  useEffect(() => {
    return () => clearIntervalTimer();
  }, []);

  /*
    Actions Methods
  */

  const handleStart = () => {
    const formTarget = formRef.current || undefined;
    let formData = new FormData(formTarget);
    let userInput: any = {};

    for (let [key, value] of formData) {
      userInput[key] = Number(value) || 0; // If needed for validations
      countdownTimeRef.current += userInput[key] * multiplierConfig[key];
    }

    intervalRef.current = setInterval(() => {
      let timeRemainInMs = countdownTimeRef.current;

      // can use string's pad method to get 0 prefix
      setCountDownTimerState({
        ...getCalculatedTimeProperties(timeRemainInMs),
        timerRunning: true,
      });

      countdownTimeRef.current -= DEFAULT_CONFIGS.CLOCK_INTERVAL_MS;
    }, DEFAULT_CONFIGS.CLOCK_INTERVAL_MS);
  };

  const handleStop = () => {
    clearIntervalTimer();
    setCountDownTimerState(new CountDownTimerStateModel());
  };

  /*
    Utility Methods
    Some of these we can put in a utils file
  */

  const clearIntervalTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getCalculatedTimeProperties = (timeRemainInMs: number) => {
    const hour = Math.floor(timeRemainInMs / (60 * 60 * 1000));
    timeRemainInMs -= hour * 60 * 60 * 1000;

    const min = Math.floor(timeRemainInMs / (60 * 1000));
    timeRemainInMs -= min * 60 * 1000;

    const sec = Math.floor(timeRemainInMs / 1000);
    timeRemainInMs -= sec * 1000;

    const ms = Math.floor(timeRemainInMs / 1);
    timeRemainInMs -= ms * 1;

    return { hour, min, sec, ms };
  };

  return (
    <CountdownTimerStyles>
      <CountDownTimerClockStyles className="countdown-timer-clock">
        {Object.keys(countDownTimerState).map((key) => (
          <div key={key} className="time-hour">
            {countDownTimerState[key as keyof CountDownTimerStateModel]}
          </div>
        ))}
      </CountDownTimerClockStyles>

      <div className="user-inputs-wrapper">
        <form ref={formRef}>
          {timerInputConfig.map((inputConfig: ITimerInputConfigItem) => {
            const { field, placeholder } = inputConfig;
            return (
              <div className="input-item">
                <label>
                  {/* <span className="label">{name}</span> */}
                  <input placeholder={placeholder} type="text" name={field} />
                </label>
              </div>
            );
          })}
        </form>
      </div>

      <div className="actions-wrapper">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </CountdownTimerStyles>
  );
};
