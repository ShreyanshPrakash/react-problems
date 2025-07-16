export interface IItems {
  id: number;
  title: string;
  x: number;
  y: number;
  placement: "relative" | "absolute";
}

export interface IDragItemProps extends IDragItemStylesProps {
  id: number;
  title: string;
  draggable?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface IDragItemStylesProps {
  x: number;
  y: number;
  placement: "relative" | "absolute";
}
