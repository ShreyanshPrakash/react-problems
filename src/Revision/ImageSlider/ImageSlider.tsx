import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { MOCK_IMAGE_SLIDER_DATA } from "./mockData";
import { useState } from "react";
import { IImageSliderProps } from "./types";

const ImageSliderStyles = styled.div`
  .wrapper {
    position: relative;

    .controls {
      padding: 8px;
      border-radius: 18px;
      border: 2px solid white;
    }

    .left-button {
      position: absolute;
      top: 50%;
      left: 24px;
    }

    .right-button {
      position: absolute;
      top: 50%;
      right: 24px;
    }
  }
`;

const Frame = styled.div`
  width: 600px;
  height: 400px;

  display: flex;
  overflow: scroll;

  border: 4px solid white;
  border-radius: 16px;
`;

const ImageItem = styled.div``;

export const ImageSlider: FC<IImageSliderProps> = ({
  config = MOCK_IMAGE_SLIDER_DATA,
}) => {
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(0);
  const timerId = useRef<number | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      moveToNextSlide();
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [activeSliderIndex]);

  const shouldLoad = (itemId: number, activeId: number) => {
    if (itemId >= activeId - 1 && itemId <= activeId + 2) {
      return true;
    }

    return false;
  };

  const moveToNextSlide = () => {
    if (activeSliderIndex < config.length) {
      setActiveSliderIndex((prev) => prev + 1);
    } else {
      setActiveSliderIndex(0);
    }
  };

  const moveToPreviousSlide = () => {
    if (activeSliderIndex === 0) {
      setActiveSliderIndex(config.length - 1);
    } else {
      setActiveSliderIndex((prev) => prev - 1);
    }
  };

  return (
    <ImageSliderStyles>
      <div className="wrapper">
        <Frame>
          {config.map((item) => {
            const { id, alt, imgSrc } = item;

            return shouldLoad(id, activeSliderIndex) ? (
              <ImageItem key={id}>
                <img src={imgSrc} alt={alt} />
              </ImageItem>
            ) : null;
          })}
        </Frame>
        <span className="left-button controls" onClick={moveToNextSlide}>
          {"<"}
        </span>
        <span className="right-button controls" onClick={moveToPreviousSlide}>
          {">"}
        </span>
      </div>
      <div>Active Index : {activeSliderIndex}</div>
    </ImageSliderStyles>
  );
};
