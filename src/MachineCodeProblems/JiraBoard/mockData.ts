import { IGroup } from "./type";

export const MOCK_KANBAN_DATA: Array<IGroup> = [
  {
    groupId: 1,
    categoryName: "To-Do",
    items: [
      {
        id: 1,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 2,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 3,
        title: "Task 1",
        description: "Something as description for the item",
      },
    ],
  },
  {
    groupId: 2,
    categoryName: "In-Progress",
    items: [
      {
        id: 1,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 2,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 3,
        title: "Task 1",
        description: "Something as description for the item",
      },
    ],
  },
  {
    groupId: 3,
    categoryName: "Done",
    items: [
      {
        id: 1,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 2,
        title: "Task 1",
        description: "Something as description for the item",
      },
      {
        id: 3,
        title: "Task 1",
        description: "Something as description for the item",
      },
    ],
  },
];
