import { Dispatch, SetStateAction } from "react";

export interface ITheme{
    primaryColor?: string;
    color?: string;
}

export interface IMyContextState{
    theme: ITheme;
    setTheme?: Dispatch<SetStateAction<ITheme>>;
}

export interface IMyThemeProviderProps{
    value: ITheme,
    children: React.ReactElement;
}