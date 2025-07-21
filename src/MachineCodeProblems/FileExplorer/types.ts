

export interface IFileExporerItem{
    id: string;
    parentId: string | null;
    level: number;
    name: string;
    type: string;
    children: Array<IFileExporerItem>;
}

export interface IFileExplorerRunnerProps{
    fileItems: Array<IFileExporerItem>;
}

export interface IFileExplorerProps{
    fileItems: Array<IFileExporerItem>;
    onAdd: (item: IFileExporerItem) => void;
    onDelete: (item: IFileExporerItem) => void;
}

export interface IFileItemStyles{
    level: number;
}