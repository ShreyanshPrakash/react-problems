export const drawRectagle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.fillRect(x, y, width, height);
};


export const drawACircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI,
) => {
    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill()
}