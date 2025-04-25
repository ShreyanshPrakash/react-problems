import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const TrafficLightsStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .actions-wrapper {
    display: flex;
    gap: 16px;
  }

  .traffic-light-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    background-color: black;
    width: 64px;
    height: 200px;
    border-radius: 16px;
  }
`;

const Light = styled.div<ILightProps>`
  width: 40px;
  height: 40px;
  background-color: ${({ color }) => color || DEFAULTS.LIGHTS_COLOR};
  border-radius: 50%;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface ITrafficLightsProps {}

interface ILightProps {
  color?: string | null;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  LIGHTS_COLOR: "gray",
  RED_LIGHT: "red",
  YELLOW_LIGHT: "yellow",
  GREEN_LIGHT: "green",
};

const TRAFFIC_LIGHTS_CONFIG = [
  {
    name: "greenLight",
    color: DEFAULTS.GREEN_LIGHT,
    durationMs: 3 * 1000,
  },
  {
    name: "yellowLight",
    color: DEFAULTS.YELLOW_LIGHT,
    durationMs: 0.5 * 1000,
  },
  {
    name: "redLight",
    color: DEFAULTS.RED_LIGHT,
    durationMs: 4 * 1000,
  },
];

/*
    ====================================================== [TrafficLights Component]======================================================
*/

export const TrafficLights: FC<
  ITrafficLightsProps
> = ({}: ITrafficLightsProps): ReactElement => {
  const [isTrafficLightActive, setIsTrafficLightActive] = useState(false);
  const [activeLightIndex, setActiveLightIndex] = useState<number>(-1);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTrafficLightActive) {
      handleNextLight();
    } else {
      cleanupTimer();
    }
    return () => cleanupTimer();
  }, [isTrafficLightActive]);

  useEffect(() => {
    if (activeLightIndex > -1) {
      const config = TRAFFIC_LIGHTS_CONFIG[activeLightIndex];
      intervalRef.current = setTimeout(() => {
        handleNextLight();
      }, config.durationMs);
    }
  }, [activeLightIndex]);

  /*
    User Event Methods
  */

  const handleStartOrStop = () => {
    setIsTrafficLightActive((prev) => !prev);
  };

  const handleReset = () => {
    setActiveLightIndex(-1);
  };

  const handleNextLight = () => {
    const newIndex =
      activeLightIndex + 1 >= TRAFFIC_LIGHTS_CONFIG.length
        ? 0
        : activeLightIndex + 1;
    setActiveLightIndex(newIndex);
  };

  /*
    Utility Methods
  */

  const cleanupTimer = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const allowReset = (): boolean => {
    return activeLightIndex != -1 && !isTrafficLightActive;
  };

  return (
    <TrafficLightsStyles>
      <div className="actions-wrapper">
        <button onClick={handleStartOrStop}>
          {isTrafficLightActive ? "Stop Squid Game" : "Start Squid Game"}
        </button>
        <button onClick={handleReset} disabled={!allowReset()}>
          Reset
        </button>
        {/* Helpful in understanding */}
        <button onClick={handleNextLight}>Next</button>
      </div>
      <div className="traffic-light-box">
        {TRAFFIC_LIGHTS_CONFIG.map((config, index) => {
          const { color, name } = config;
          return (
            <Light key={name} color={activeLightIndex === index ? color : ""} />
          );
        })}
      </div>
    </TrafficLightsStyles>
  );
};
