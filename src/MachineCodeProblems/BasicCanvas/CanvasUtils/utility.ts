import { ICircleObject } from "MachineCodeProblems/BasicCanvas/CanvasTypes";

export const detectOverlap = (
  newObject: ICircleObject,
  newMap: Map<number, ICircleObject>
) => {
  newMap.forEach((object) => {
    const minDistance = object.radius + newObject.radius;

    const xDistance = Math.pow(object.x - newObject.x, 2);
    const yDistance = Math.pow(object.y - newObject.y, 2);
    const distance = Math.sqrt(xDistance + yDistance);

    if (object.id !== newObject.id && distance <= minDistance) {
      console.log("Collided : ", object);
    }
  });
};

export const getPointerXAndY = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement
) => {
  const { clientX, clientY } = event;
  const { x, y } = canvas.getBoundingClientRect();
  const pointerX = clientX - x;
  const pointerY = clientY - y;
  return { pointerX, pointerY };
};
