import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const LayoutTryStyles = styled.div`
  .flex-wrapper {
    display: flex;
    flex-wrap: nowrap;

    width: 560px;
    height: 320px;
    overflow-x: scroll;

    .flex-item {
      min-width: 560px;
      height: 320px;
      background-color: lightblue;
      border: 2px solid black;

      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .frame-controls-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px;

    position: relative;
    top: -192px;

    .arrow {
      border: 2px solid white;
      border-radius: 100%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .frame-wrapper {
    position: relative;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface LayoutTryProps {
  sliderConfig: Array<IImageSliderConfig>;
  interval: number;
}

interface IImageSliderConfig {
  alt: string;
  label: string;
  imgSrc: string;
  id: number;
}

/*
    ====================================================== [Configs]======================================================
*/

const IMAGE_SLIDER_CONFIG = [
  {
    alt: "first",
    label: "First Slide",
    imgSrc: "",
    id: 0,
  },
  {
    alt: "second",
    label: "Second Slide",
    imgSrc: "",
    id: 1,
  },
  {
    alt: "third",
    label: "Third Slide",
    imgSrc: "",
    id: 2,
  },
  {
    alt: "fourth",
    label: "Fourth Slide",
    imgSrc: "",
    id: 3,
  },
];

const DEFAULT_CONFIG = {
  FRAME_WIDTH: 560,
  FRAME_HEIGHT: 320,
  SLIDER_INTERVAL: 2 * 1000,
  IMAGE_SLIDER_CONFIG,
};

/*
    ====================================================== [LayoutTry Component]======================================================
*/

export const LayoutTry: FC<LayoutTryProps> = ({
  sliderConfig = DEFAULT_CONFIG.IMAGE_SLIDER_CONFIG,
  interval = DEFAULT_CONFIG.SLIDER_INTERVAL,
}: LayoutTryProps): ReactElement => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const sliderTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    sliderTimerRef.current = setTimeout(() => {
      moveToNextSlide();
    }, interval);

    return () => {
      clearTimeout(sliderTimerRef.current);
    };
  }, [activeSlideIndex]);

  /*
    User Event Handlers
  */

  const handleLeftClick = () => {
    moveToPreviousSlide();
  };

  const handleRightClick = () => {
    moveToNextSlide();
  };

  /*
    Utility Methods
  */

  const moveToNextSlide = () => {
    if (activeSlideIndex < sliderConfig.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    } else if (activeSlideIndex === sliderConfig.length - 1) {
      setActiveSlideIndex(0);
    }
  };

  const moveToPreviousSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    } else if (activeSlideIndex === 0) {
      setActiveSlideIndex(sliderConfig.length - 1);
    }
  };

  return (
    <LayoutTryStyles>
      <div className="frame-wrapper">
        <div className="flex-wrapper">
          {sliderConfig.map((slider) => {
            const { id, label } = slider;
            return activeSlideIndex === id ? (
              <div key={id} className="flex-item">
                {label}
              </div>
            ) : null;
          })}
        </div>

        <div className="frame-controls-wrapper">
          <div className="left-arrow arrow" onClick={handleLeftClick}>
            {"<"}
          </div>
          <div className="right-arrow arrow" onClick={handleRightClick}>
            {">"}
          </div>
        </div>
      </div>
    </LayoutTryStyles>
  );
};
