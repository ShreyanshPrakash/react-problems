export interface IFileExporerItem {
  id: string;
  parentId: string | null;
  level: number;
  name: string;
  type: string;
  isExpanded?: boolean;
  children: Array<IFileExporerItem>;
}

export interface IFileExplorerRunnerProps {
  fileItems: Array<IFileExporerItem>;
}

export interface IFileExplorerProps {
  fileItems: Array<IFileExporerItem>;
  onAdd: (
    item: IFileExporerItem,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onDelete: (
    item: IFileExporerItem,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onItemClick: (
    item: IFileExporerItem,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface IFileItemStyles {
  level: number;
}
