import {
  IDragItemProps,
  IDragItemStylesProps,
} from "MachineCodeProblems/DragDrop/type";
import React, { FC, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .drop-zone-wrapper {
    width: 500px;
    height: 240px;
    border: 2 px solid black;
    background-color: white;
    border-radius: 16px;
    position: relative;
  }
`;

const DEFAULT = {
  ITEMS: [
    { id: 1, title: "First", x: 100, y: 30, placement: "relative" },
    { id: 2, title: "Second", x: 50, y: 30, placement: "relative" },
    { id: 3, title: "Third", x: 20, y: 30, placement: "relative" },
    { id: 4, title: "Fourth", x: 200, y: 30, placement: "relative" },
  ],
};

export const DragDrop = () => {
  const [droppedItems, setDroppedItems] = useState<Array<any>>([]);
  const [activeDragItem, setActiveDragItem] = useState({});
  const [activeDragItemTarget, setActiveDragItemTarget] =
    useState<EventTarget>();
  const [dragItemXY, setDragItemXY] = useState({});

  /*
    Drag Zone Methods
  */

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();
    let newItem = {
      ...activeDragItem,
      placement: "absolute",
      x: dragItemXY.x - x - 160 + 160 / 2,
      y: dragItemXY.y - y - 80 - 80 / 2,
    };

    setDroppedItems((prev) => [...prev, newItem]);
    setActiveDragItem({});
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  /*
    Drag Item Methods
  */

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setActiveDragItemTarget(event.target);
    const dragItemId = event.currentTarget.getAttribute("data-id");

    const filteredItem = DEFAULT.ITEMS.filter(
      (item) => item.id === Number(dragItemId)
    );
    if (filteredItem.length) {
      setActiveDragItem(filteredItem[0]);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    const { screenX, screenY } = event;
    // console.log(screenX, screenY);
    setDragItemXY({
      x: screenX,
      y: screenY,
    });
  };

  return (
    <Styles>
      <div
        className="drop-zone-wrapper"
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
      >
        <span>This is Drop Zone</span>
        <div className="dropped-item-wrapper">
          {droppedItems.map((item) => (
            <DragItem {...item} onDragStart={handleDragStart} />
          ))}
        </div>
      </div>
      {DEFAULT.ITEMS.map((item) => (
        <DragItem {...item} onDragStart={handleDragStart} onDrag={handleDrag} />
      ))}
    </Styles>
  );
};

const DragItemStyles = styled.div<IDragItemStylesProps>`
  width: 160px;
  position: ${({placement}) => placement || "relative"};
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  .drag-item {
    height: 80px;
    border: 2 px solid black;
    background-color: lightblue;
    border-radius: 16px;
  }

  .item-hightlight {
    background-color: lightgray;
  }

  .item-unhighlight {
    background-color: lightblue;
  }
`;

const DragItem: FC<IDragItemProps> = ({
  id,
  title,
  x,
  y,
  placement = "relative",
  draggable = true,
  onDragStart,
  onDrag,
}): React.ReactElement => {
  const [highlight, setHighlight] = useState(false);

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    setHighlight(true);
  };

  const handleOnDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setHighlight(false);
  };

  return (
    <DragItemStyles x={x} y={y} placement={placement}>
      <div
        key={id}
        className={`drag-item ${
          highlight ? "item-hightlight" : "item-unhighlight"
        }`}
        data-id={id}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrag={onDrag}
      >
        {title}
      </div>
    </DragItemStyles>
  );
};
