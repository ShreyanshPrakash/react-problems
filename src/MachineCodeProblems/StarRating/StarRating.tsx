import {
  IStarRatingProps,
  IStarStylesProps,
} from "MachineCodeProblems/StarRating/types";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const DEFAULTS = {
  TOTAL_STARS: 5,
  FILLED_STARS: 2.2,
  FILLED: "filled",
  PARTIAL: "partial",
  UNFILLED: "unfilled",
};

const Styles = styled.div`
  display: flex;
  gap: 16px;
`;

const Star = styled.div<IStarStylesProps>`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  border: 2px solid white;

  &.filled {
    background-color: white;
  }

  &.partial {
    overflow: hidden;

    .inner {
      width: 50%;
      height: 100%;
      background-color: white;
    }
  }
`;

export const StarRating: FC<IStarRatingProps> = ({
  total = DEFAULTS.TOTAL_STARS,
  filledCount = DEFAULTS.FILLED_STARS,
}: IStarRatingProps): React.ReactElement => {
  const [starState, setStarState] = useState<Array<String>>([]);

  useEffect(() => {
    let list = generateStarStae(filledCount - 1);
    setStarState(list);
  }, [total, filledCount]);

  const handleStarClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    const idVal = starState[id];
    const fillUptoIndex = idVal === DEFAULTS.FILLED ? id - 1 : id;
    let list = generateStarStae(fillUptoIndex);
    setStarState(list);
  };

  const generateStarStae = (fillUptoIndex: number): Array<string> => {
    let list = [];
    for (let i = 0; i < total; i++) {
      list.push(i <= fillUptoIndex ? DEFAULTS.FILLED : DEFAULTS.UNFILLED);
    }

    if (fillUptoIndex % 1 !== 0) {
      const ceil = Math.ceil(fillUptoIndex);
      list[ceil] = DEFAULTS.PARTIAL;
    }

    return list;
  };

  return (
    <Styles>
      {starState.map((state, index) => {
        return (
          <Star
            key={index}
            data-id={index}
            className={state}
            onClick={handleStarClick}
          >
            <div className="inner"></div>
          </Star>
        );
      })}
    </Styles>
  );
};
