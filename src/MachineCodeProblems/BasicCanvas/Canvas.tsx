import {
  ICanvasProps,
  ICircleObject,
} from "MachineCodeProblems/BasicCanvas/CanvasTypes";
import {
  detectOverlap,
  drawACircle,
  drawRectagle,
  getPointerXAndY,
} from "./CanvasUtils";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CanvasStyles = styled.div`
  canvas {
    background-color: white;
  }
`;

export const Canvas: FC<ICanvasProps> = ({
  width,
  height,
  onReady,
}): React.ReactElement => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const canvas2DCtx = useRef<null | CanvasRenderingContext2D>(null);

  const [canvasObjectMap, setCanvasObjectMap] = useState(new Map());

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      canvas2DCtx.current = ctx;
      onReady?.(ctx);
    }
    if (canvasRef.current) {
      attachEventHandlers(canvasRef.current);
    }
  }, [canvasObjectMap]);

  const attachEventHandlers = (canvasLayer: HTMLCanvasElement) => {
    // canvasLayer.onmousemove = (event) => console.log(event);
    canvasLayer.onclick = handleOnCanvasClick;
    canvasLayer.onmousemove = handleOnObjectHover;
  };

  /*
    User Event Methods
  */

  const handleOnObjectHover = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvas2DCtx.current && canvasRef.current) {
      const { pointerX, pointerY } = getPointerXAndY(event, canvasRef.current);
      const pointerObject: ICircleObject = {
        id: Infinity,
        type: "circle",
        x: pointerX,
        y: pointerY,
        radius: 0,
      };
      detectOverlap(pointerObject, canvasObjectMap);
    }
  };

  const handleOnCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvas2DCtx.current && canvasRef.current) {
      const { pointerX, pointerY } = getPointerXAndY(event, canvasRef.current);
      drawACircle(canvas2DCtx.current, pointerX, pointerY, 20);
      let newMap = new Map(canvasObjectMap.entries());
      const newObject: ICircleObject = {
        id: newMap.size,
        type: "circle",
        x: pointerX,
        y: pointerY,
        radius: 20,
      };
      newMap.set(newMap.size, newObject);
      setCanvasObjectMap(newMap);
      detectOverlap(newObject, newMap);
    }
  };

  /*
    Utility Methods
  */

  return (
    <CanvasStyles className="canvas-wrapper">
      <canvas ref={canvasRef} id="canvas" width={width} height={height} />
    </CanvasStyles>
  );
};
