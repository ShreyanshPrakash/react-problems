import { findItemById, generateANewItem } from "./utils";
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

  const handleAdd = (item?: IFileExporerItem) => {
    if (item) {
      const copy = cloneDeep(fileState);
      let matchedItem = findItemById(item.id, copy);
      if (matchedItem) {
        matchedItem.children.push(generateANewItem(matchedItem));
        setFileState([...copy]);
      }
    }
  };

  const handleDelete = (item?: IFileExporerItem) => {
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

  return (
    <Styles>
      <div className="header-actions">
        <div className="add-item">
          <button onClick={() => handleAdd()}>Add</button>
        </div>
      </div>
      <div className="wrapper">
        <FileExplorer
          fileItems={fileState}
          onAdd={handleAdd}
          onDelete={handleDelete}
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
    min-width: 320px;
    align-items: center;

    .file-item-name {
      font-size: 18px;
    }

    .actions-wrapper {
      display: flex;
      gap: 16px;
    }

    margin-left: ${({ level }) => level * 32}px;
  }
`;

const FileExplorer: FC<IFileExplorerProps> = ({
  fileItems,
  onAdd,
  onDelete,
}) => {
  return (
    <FileExplorerStyles>
      {fileItems.map((item: IFileExporerItem, index: number) => {
        const { id, parentId, level, name, type, children } = item;

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
                    <button onClick={() => onAdd(item)}>Add</button>
                  </div>
                  <div className="add-item">
                    <button onClick={() => onDelete(item)}>Delete</button>
                  </div>
                </div>
              </div>
              {children.length > 0 ? (
                <div className="file-children">
                  <FileExplorer
                    key={`${id} - ${parentId}`}
                    fileItems={children}
                    onAdd={onAdd}
                    onDelete={onDelete}
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
