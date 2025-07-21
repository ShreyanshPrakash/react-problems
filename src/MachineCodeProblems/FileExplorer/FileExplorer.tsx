import { findItemById, generateANewItem, generateANewRootItem } from "./utils";
import { MOCK_FILE_EXPLORER } from "./mockData";
import {
  IFileExplorerProps,
  IFileExplorerRunnerProps,
  IFileExporerItem,
  IFileItemStyles,
} from "./types";
import { FC, useState } from "react";
import styled from "styled-components";
import { cloneDeep } from "lodash";

const Styles = styled.div``;

export const FileExplorerRunner: FC<IFileExplorerRunnerProps> = ({
  fileItems = MOCK_FILE_EXPLORER,
}) => {
  const [fileState, setFileState] =
    useState<Array<IFileExporerItem>>(fileItems);

  const handleRootAdd = () => {
    const copy = cloneDeep(fileState);
    copy.push(generateANewRootItem(copy));
    setFileState([...copy]);
  };

  const handleAdd = (
    item: IFileExporerItem,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (item) {
      const copy = cloneDeep(fileState);
      let matchedItem = findItemById(item.id, copy);
      if (matchedItem) {
        matchedItem.children.push(generateANewItem(matchedItem));
        matchedItem.isExpanded = true;
        setFileState([...copy]);
      }
    }
  };

  const handleDelete = (
    item: IFileExporerItem,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (item) {
      const copy = cloneDeep(fileState);
      if (item.parentId === null) {
        let newList = copy.filter((arrItem) => arrItem.id !== item.id);
        setFileState([...newList]);
      } else {
        let matchedItem = findItemById(item.parentId, copy);
        if (matchedItem) {
          let newChildren = matchedItem.children.filter(
            (child) => child.id !== item.id
          );
          matchedItem.children = newChildren;
          setFileState([...copy]);
        }
      }
    }
  };

  const handleToggleExpand = (
    item: IFileExporerItem,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (item) {
      const copy = cloneDeep(fileState);
      let matchedItem = findItemById(item.id, copy);
      if (matchedItem) {
        matchedItem.isExpanded = !matchedItem.isExpanded;
        setFileState([...copy]);
      }
    }
  };

  return (
    <Styles>
      <div className="header-actions">
        <div className="add-item">
          <button onClick={handleRootAdd}>Add</button>
        </div>
      </div>
      <div className="wrapper">
        <FileExplorer
          fileItems={fileState}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onItemClick={handleToggleExpand}
        />
      </div>
    </Styles>
  );
};

const FileExplorerStyles = styled.div``;

const FileItemStyles = styled.div<IFileItemStyles>`
  .file-item {
    display: flex;
    justify-content: space-between;

    border: 2px solid white;
    border-radius: 8px;
    padding: 8px;
    margin: 16px;
    width: 560px;
    align-items: center;

    .file-item-name {
      font-size: 18px;
    }

    .actions-wrapper {
      display: flex;
      gap: 16px;
    }

    margin-left: ${({ level }) => level * 56}px;
  }
`;

const FileExplorer: FC<IFileExplorerProps> = ({
  fileItems,
  onAdd,
  onDelete,
  onItemClick,
}) => {
  return (
    <FileExplorerStyles>
      {fileItems.map((item: IFileExporerItem, index: number) => {
        const { id, parentId, level, name, type, isExpanded, children } = item;

        return (
          <>
            <FileItemStyles
              key={id}
              className="file-item-wrapper"
              level={level}
            >
              <div className="file-item">
                <div className="file-item-name">{name}</div>
                <div className="actions-wrapper">
                  <div className="add-item">
                    <button onClick={(event) => onAdd(item, event)}>Add</button>
                  </div>
                  <div className="add-item">
                    <button onClick={(event) => onDelete(item, event)}>
                      Delete
                    </button>
                  </div>
                  <div className="add-item">
                    <button
                      onClick={(event) => onItemClick(item, event)}
                      disabled={!children.length}
                    >
                      {isExpanded ? "Collapse" : "Expand"} ({children.length})
                    </button>
                  </div>
                </div>
              </div>
              {children.length > 0 && isExpanded ? (
                <div className="file-children">
                  <FileExplorer
                    key={`${id} - ${parentId}`}
                    fileItems={children}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    onItemClick={onItemClick}
                  />
                </div>
              ) : null}
            </FileItemStyles>
          </>
        );
      })}
    </FileExplorerStyles>
  );
};
