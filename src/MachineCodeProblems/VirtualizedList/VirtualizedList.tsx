import { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    width: 400px;
    overflow-y: scroll;
  }

  .border {
    border: 2px solid white;
    border-radius: 16px;
  }
`;

const ListItem = styled.div`
  background-color: white;
  margin: 8px 8px;
  color: black;
  padding: 8px;
`;

const DEFAULTS = {
  ITEM_HEIGHT: 44,
  WINDOW_HEIGHT: 720,
  OVER_SCAN_COUNT: 4,
  ON_LOAD_ITEM_COUNT: 100,
};

export const VirtualizedList = ({}) => {
  const [itemList, setItemList] = useState<number[]>([]);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const startIndex = Math.floor(scrollTop / DEFAULTS.ITEM_HEIGHT);
  const endIndex = Math.min(
    startIndex + Math.ceil(DEFAULTS.WINDOW_HEIGHT / DEFAULTS.ITEM_HEIGHT),
    itemList.length
  );

  const visibleItems = itemList.slice(startIndex, endIndex);

  useEffect(() => {
    let list = [];
    for (let i = 1; i <= DEFAULTS.ON_LOAD_ITEM_COUNT; i++) {
      list.push(i);
    }

    setItemList(list);
  }, []);

  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop;
    setScrollTop(scrollTop);
  };

  return (
    <Styles>
      <div
        className="container border"
        onScroll={handleScroll}
        style={{
          height: `${DEFAULTS.WINDOW_HEIGHT}px`,
        }}
      >
        <div
          className="scroll-container border"
          style={{
            height: `${itemList.length * DEFAULTS.ITEM_HEIGHT}px`,
          }}
        >
          <div
            className="visible-area"
            style={{
              position: "relative",
              height: `${visibleItems.length * DEFAULTS.ITEM_HEIGHT}px`,
              top: `${startIndex * DEFAULTS.ITEM_HEIGHT}px`,
            }}
          >
            {visibleItems.map((item) => (
              <ListItem className="list-item border">{item}</ListItem>
            ))}
          </div>
        </div>
      </div>
    </Styles>
  );
};
