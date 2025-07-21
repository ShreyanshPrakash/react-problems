import { uniqueId } from "lodash";
import { IFileExporerItem } from "./types";

export const findItemById = (
  itemToFindId: string,
  fileState: Array<IFileExporerItem>
): IFileExporerItem | null => {
  let matchedItem = null;

  if (!fileState.length) {
    return matchedItem;
  }

  for (let item of fileState) {
    if (item.id === itemToFindId) {
      matchedItem = item;
      break;
    }

    if (item.children.length) {
      matchedItem = findItemById(itemToFindId, item.children);
      if (matchedItem) {
        break;
      }
    }
  }

  return matchedItem;
};

export const generateANewItem = (matchedItem: IFileExporerItem) => {
  return {
    id: uniqueId(),
    parentId: matchedItem.id,
    level: matchedItem.level + 1,
    name: `${matchedItem.id} child ${matchedItem.children.length + 1}`,
    type: "file",
    children: [],
  };
};

export const generateANewRootItem = (filrState: Array<IFileExporerItem>) => {
  const id = uniqueId();
  return {
    id: id,
    parentId: null,
    level: 0,
    name: `${id} child ${filrState.length + 1}`,
    type: "file",
    children: [],
  };
};
