import { MOCK_KANBAN_DATA } from "./mockData";
import { IGroup, IItem, IJiraBoard } from "./type";
import { FC, useRef, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  .title-text {
    font-size: 24px;
  }
`;

const Board = styled.div`
  display: flex;
  gap: 16px;
`;

const Category = styled.div`
  border: 2px solid white;
  border-radius: 8px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  .items-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const Item = styled.div`
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
`;

export const JiraBoard: FC<IJiraBoard> = ({
  data = MOCK_KANBAN_DATA,
}): React.ReactElement => {
  const [boardState, setBoardState] = useState<Array<IGroup>>(data);
  const dragItem = useRef<HTMLDivElement | null>(null);

  /*
    Item Methods
  */
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
    dragItem.current = event.currentTarget;
  };

  /*
    Category Methods
  */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    const destinationGroupId = Number(
      event.currentTarget.getAttribute("data-group-id")
    );

    const sourceGroupId = Number(
      dragItem.current?.getAttribute("data-group-id")
    );
    const itemId = Number(dragItem.current?.getAttribute("data-item-id"));

    const stateCopy = [...boardState];

    let matchedItem = null;
    let filteredItems = [];
    let sourceGroup = stateCopy[sourceGroupId - 1];
    for (let item of sourceGroup.items) {
      if (item.id === itemId) {
        matchedItem = item;
      } else {
        filteredItems.push(item);
      }
    }

    sourceGroup.items = filteredItems;
    if (matchedItem) {
      stateCopy[destinationGroupId - 1].items.push({
        ...matchedItem,
        id: stateCopy[destinationGroupId - 1].items.length + 1,
      });
    }

    setBoardState(stateCopy);
  };

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Styles>
      <Board className="board-wrapper">
        {boardState.map((group: IGroup, index: number) => {
          const { groupId, categoryName, items } = group;
          return (
            <Category
              key={groupId}
              data-group-id={groupId}
              onDrop={handleDrop}
              onDragOver={handleOnDragOver}
            >
              <div className="category-title title-text">{categoryName}</div>
              <div className="items-wrapper">
                {items.map((item: IItem, index: number) => {
                  const { id, title, description } = item;
                  return (
                    <Item
                      key={id}
                      draggable={true}
                      data-group-id={groupId}
                      data-item-id={id}
                      onDragStart={handleDragStart}
                    >
                      <div className="item-title title-text">{title}</div>
                      <div className="description">{description}</div>
                    </Item>
                  );
                })}
              </div>
            </Category>
          );
        })}
      </Board>
    </Styles>
  );
};
