


export interface IBasicCanvasProps{
    
}

export interface ICanvasProps{
    width: number;
    height: number;
    onReady?: (canvasRef: CanvasRenderingContext2D) => void;
}




/*
    Canvas Shape Payload
*/

export interface ICircleObject {
    id: number;
    type: "circle",
    x: number;
    y: number;
    radius: number;
}