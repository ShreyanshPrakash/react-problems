import { useRef } from "react";
import { Canvas } from "./Canvas";
import styled from "styled-components";

const BasicCanvasStyles = styled.div``;

const CanvasContainer = styled.div`
  width: 1240px;
  height: 800px;

  border: 2px solid white;
  border-radius: 16px;
  overflow: hidden;
  padding: 8px;
`;

export const BasicCanvas = () => {
  const canvasLayerRef = useRef<null | CanvasRenderingContext2D>(null);

  const onCanvasReady = (canvasRef: CanvasRenderingContext2D) => {
    canvasLayerRef.current = canvasRef;
  };

  return (
    <BasicCanvasStyles>
      <CanvasContainer className="canvas-container">
        <Canvas onReady={onCanvasReady} width={1240} height={800}/>
      </CanvasContainer>
    </BasicCanvasStyles>
  );
};
