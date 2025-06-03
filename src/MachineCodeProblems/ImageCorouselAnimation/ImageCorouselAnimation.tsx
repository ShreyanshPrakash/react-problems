import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const ImageCorouselAnimationStyles = styled.div<IImageSliderStyles>`
  .flex-wrapper {
    display: flex;
    flex-wrap: nowrap;

    width: 560px;
    height: 320px;
    overflow-x: scroll;

    .flex-item {
      box-sizing: border-box;
      min-width: 560px;
      height: 320px;
      background-color: lightblue;
      border: 2px solid black;

      color: black;
      display: flex;
      align-items: center;
      justify-content: center;

      transform: translateX(${({ index }) => index * -560}px);
      transition: transform 0.5s linear;
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

const SliderClickButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 4px;

  position: relative;
  top: -110px;

  .inner-wrapper {
    display: flex;
    justify-content: space-around;
    gap: 4px;

    background-color: black;
    padding: 6px 12px;
    border-radius: 24px;
  }
`;

const SliderClickButton = styled.div`
  width: 8px;
  height: 8px;
  background-color: white;
  border: 4px splid red;
  border-radius: 100%;
  cursor: pointer;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IImageCorouselAnimationProps {
  sliderConfig: Array<IImageSliderConfig>;
  interval: number;
}

interface IImageSliderConfig {
  alt: string;
  label: string;
  imgSrc: string;
  id: number;
}

interface IImageSliderStyles {
  index: number;
}

/*
    ====================================================== [Configs]======================================================
*/

const IMAGE_SLIDER_CONFIG = [
  {
    alt: "first",
    label: "First Slide",
    imgSrc: "https://picsum.photos/id/600/600/400",
    id: 0,
  },
  {
    alt: "second",
    label: "Second Slide",
    imgSrc: "https://picsum.photos/id/100/600/400",
    id: 1,
  },
  {
    alt: "third",
    label: "Third Slide",
    imgSrc: "https://picsum.photos/id/200/600/400",
    id: 2,
  },
  {
    alt: "fourth",
    label: "Fourth Slide",
    imgSrc: "https://picsum.photos/id/300/600/400",
    id: 3,
  },
];

const IMAGES_CONFIG = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

const DEFAULT_CONFIG = {
  FRAME_WIDTH: 560,
  FRAME_HEIGHT: 320,
  SLIDER_INTERVAL: 2 * 1000,
  IMAGE_SLIDER_CONFIG,
  IMAGES_CONFIG,
};

/*
    ====================================================== [LayoutTry Component]======================================================
*/

export const LayoutTry: FC<IImageCorouselAnimationProps> = ({
  sliderConfig = DEFAULT_CONFIG.IMAGE_SLIDER_CONFIG,
  interval = DEFAULT_CONFIG.SLIDER_INTERVAL,
}: IImageCorouselAnimationProps): ReactElement => {
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

  const handleSliderButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.getAttribute("data-index");
    setActiveSlideIndex(Number(id));
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
    <ImageCorouselAnimationStyles index={activeSlideIndex}>
      <div className="frame-wrapper">
        <div className="flex-wrapper">
          {sliderConfig.map((slider) => {
            const { id, label, alt, imgSrc } = slider;
            return (
              <div key={id} className="flex-item">
                <img alt={alt} src={imgSrc} />
              </div>
            );
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

        <SliderClickButtonsWrapper className="slider-index-wrapper">
          <div className="inner-wrapper">
            {sliderConfig.map((slider) => {
              const { id } = slider;
              return (
                <SliderClickButton
                  key={id}
                  className="slider-button-item"
                  data-index={id}
                  onClick={handleSliderButtonClick}
                />
              );
            })}
          </div>
        </SliderClickButtonsWrapper>
      </div>
    </ImageCorouselAnimationStyles>
  );
};
