import { IMyContextState, IMyThemeProviderProps, ITheme } from "./types";
import { createContext, FC, useContext, useState } from "react";

export const MyThemeContext = createContext<IMyContextState | null>(null);

export const useMyThemeContext = () => {
  const {theme, setTheme} = useContext(MyThemeContext) || {};

  if (!theme || !setTheme) {
    throw new Error("theme is null");
  }

return {theme, setTheme};
};



export const MyThemeProvider: FC<IMyThemeProviderProps> = ({
    value,
    children,
}) => {

    const [theme, setTheme] = useState<ITheme>(value);

    return (
        <MyThemeContext.Provider value={{theme, setTheme}}>
          {children}
        </MyThemeContext.Provider>
    )


}