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

interface Map {
  [key: string]: any;
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

const TRAFFIC_LIGHTS_CONFIG: Map = {
  red: {
    name: "redLight",
    color: DEFAULTS.RED_LIGHT,
    durationMs: 4 * 1000,
    next: "green",
  },
  yellow: {
    name: "yellowLight",
    color: DEFAULTS.YELLOW_LIGHT,
    durationMs: 0.5 * 1000,
    next: "red",
  },
  green: {
    name: "greenLight",
    color: DEFAULTS.GREEN_LIGHT,
    durationMs: 3 * 1000,
    next: "yellow",
  },
};

/*
    ====================================================== [TrafficLights Component]======================================================
*/

export const SimpleTrafficLights: FC<
  ITrafficLightsProps
> = ({}: ITrafficLightsProps): ReactElement => {
  const [isTrafficLightActive, setIsTrafficLightActive] = useState(false);
  const [activeColor, setActiveColor] = useState("");

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeColor) {
      const { durationMs, next } = TRAFFIC_LIGHTS_CONFIG[activeColor];
      intervalRef.current = setTimeout(() => {
        setActiveColor(next); // Main logic
      }, durationMs);
    }
    return () => cleanupTimer();
  }, [activeColor]);

  /*
    User Event Methods
  */

  const handleStartOrStop = () => {
    if (isTrafficLightActive) {
      cleanupTimer();
    } else {
      setActiveColor("green");
    }
    setIsTrafficLightActive((prev) => !prev);
  };

  const handleReset = () => {
    setActiveColor("");
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
    return activeColor != "" && !isTrafficLightActive;
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
      </div>

      <div className="traffic-light-box">
        {Object.keys(TRAFFIC_LIGHTS_CONFIG).map((key, index) => {
          const { color, name } = TRAFFIC_LIGHTS_CONFIG[key];
          return (
            <Light key={name} color={activeColor === color ? color : ""} />
          );
        })}
      </div>
    </TrafficLightsStyles>
  );
};
