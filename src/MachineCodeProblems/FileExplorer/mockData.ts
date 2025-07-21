import { uniqueId } from "lodash";
import { IFileExporerItem } from "./types";

export const MOCK_FILE_EXPLORER: Array<IFileExporerItem> = [
  {
    id: uniqueId(),
    parentId: null,
    level: 0,
    name: "One",
    type: "file",
    isExpanded: false,
    children: [
      {
        id: uniqueId(),
        parentId: "1",
        level: 1,
        name: "One child 1",
        type: "file",
        isExpanded: false,
        children: [],
      },
    ],
  },
  {
    id: uniqueId(),
    parentId: null,
    level: 0,
    name: "two",
    type: "file",
    isExpanded: true,
    children: [
      {
        id: uniqueId(),
        parentId: "3",
        level: 1,
        name: "two child 1",
        type: "file",
        isExpanded: false,
        children: [],
      },
    ],
  },
];
