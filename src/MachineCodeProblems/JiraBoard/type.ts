export interface IGroup {
  groupId: number;
  categoryName: string;
  items: Array<IItem>;
}

export interface IItem {
  id: number;
  title: string;
  description: string;
}

export interface IJiraBoard {
  data: Array<IGroup>;
}
