import { IInfiniteItem } from "MachineCodeProblems/InfiniteScroll/types";
import { MOCK_INFINITE_LIST } from "./mockData";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Styles = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;

  .infinite-item {
    width: 240px;
    height: 80px;
    background-color: white;
    border-radius: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
`;

export const InfiniteScroll = () => {
  const [itemsLoaded, setItemsLoaded] =
    useState<Array<IInfiniteItem>>(MOCK_INFINITE_LIST);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadMoreData(10);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && observerRef.current) {
            observerRef.current.unobserve(entry.target);
            loadMoreData(10);
          }
        }
      },
      { threshold: 1 }
    );

    const items = rootRef.current?.children || [];
    observerRef.current.observe(items[items.length - 1]);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [itemsLoaded]);

  const loadMoreData = (count: number) => {
    if (itemsLoaded.length >= 100) {
      return;
    }
    let newItems: Array<IInfiniteItem> = [];
    for (let i = 1; i <= count; i++) {
      newItems.push({
        id: i,
        title: String(i),
      });
    }
    setItemsLoaded((prev) => [...prev, ...newItems]);
  };

  return (
    <Styles ref={rootRef}>
      {itemsLoaded.map((item: IInfiniteItem, index: number) => {
        return (
          <div key={index} data-id={index} className="infinite-item">
            {index + 1} - {item.title}
          </div>
        );
      })}
    </Styles>
  );
};
