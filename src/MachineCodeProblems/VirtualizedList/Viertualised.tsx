import { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  box-sizing: border-box;
  .outer-wrapper {
    height: 320px;
    /* width: 250px; */
    overflow-y: scroll;
    border: 2px solid white;
    padding: 8px;
  }

  .wrapper {
    /* display: flex;
    flex-direction: column;
    gap: 16px; */

    /* height: 320px;
    width: 250px;
    overflow-y: scroll;
    border: 2px solid white;
    padding: 8px; */
  }

  .item-box {
    width: 240px;
    height: 80px;
    background-color: white;
    border-radius: 16px;

    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 8px auto;
  }
`;

const DEFAULTS = {
  ITEM_HEIGHT: 80,
  WINDOW_HEIGHT: 320,
  OVER_SCAN_COUNT: 4,
  ON_LOAD_ITEM_COUNT: 100,
};

const loadData = (count: number, startIndex: number = 0) => {
  let newList = [];
  for (let i = 1; i <= count; i++) {
    newList.push(i + startIndex);
  }

  return newList;
};

const itemsList = loadData(100);

export function VirtualizedList2({
  items = itemsList,
  itemHeight = DEFAULTS.ITEM_HEIGHT,
  containerHeight = DEFAULTS.WINDOW_HEIGHT,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  const visibleItems = items.slice(
    Math.max(0, startIndex - 5), endIndex + 5);
  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;
  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item) => (
            <div key={item} style={{ height: `${itemHeight}px` }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  );
}
