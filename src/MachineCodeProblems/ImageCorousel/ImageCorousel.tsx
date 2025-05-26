import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const ImageCorouselStyles = styled.div`
  .wrapper {
    width: 800px;
    height: 320px;

    background-color: orange;
    overflow-x: scroll;

    position: relative;

    .image-corousel-wrapper {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .action-wrapper {
      height: 100%;

      padding: 0px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      position: absolute;
      width: 100%;
      box-sizing: border-box;
      top: 0px;
    }
  }
`;

const ImageWrapper = styled.div<IImageWrapperProps>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 48px;
  font-weight: bold;

  background-color: ${({bgc}) => bgc};
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IImageCorouselProps {}

interface IImageWrapperProps {
    bgc: string;
}

/*
    ====================================================== [Configs]======================================================
*/

const IMAGE_CONFIG = [
  {
    src: "",
    alt: "",
    label: "1",
    bgc: "lightgray",
  },
  {
    src: "",
    alt: "",
    label: "3",
    bgc: "orange",
  },
  {
    src: "",
    alt: "",
    label: "2",
    bgc: "red",
  },
  {
    src: "",
    alt: "",
    label: "4",
    bgc: "lightblue",
  },
];

/*
    ====================================================== [ImageCorousel Component]======================================================
*/

export const ImageCorousel: FC<
  IImageCorouselProps
> = ({}: IImageCorouselProps): ReactElement => {
  const [activeCorouselIndex, setActiveCorouselIndex] = useState(0);

  /*
        Action Methods
    */

  const handleCorouselChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
  };

  return (
    <ImageCorouselStyles>
      <div className="wrapper">
        <div className="image-corousel-wrapper">
          {IMAGE_CONFIG.map((imgItem, index) => {
            const { label, bgc } = imgItem;
            return (
              <ImageWrapper className="image-wrapper" key={label} bgc={bgc}>
                {label}
              </ImageWrapper>
            );
          })}
        </div>
        <div className="action-wrapper">
          <button name="left" onClick={handleCorouselChange}>
            {"<"}
          </button>
          <button name="right" onClick={handleCorouselChange}>
            {">"}
          </button>
        </div>
      </div>
    </ImageCorouselStyles>
  );
};
