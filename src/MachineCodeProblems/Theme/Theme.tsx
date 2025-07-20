import { ITheme } from "MachineCodeProblems/Theme/types";
import { MyThemeProvider, useMyThemeContext } from "./context";
import styled from "styled-components";
import { useEffect } from "react";

const Styles = styled.div``;

const initialState: ITheme = {
  primaryColor: "black",
  color: "white",
};

export const ReactTheme = () => {
  return (
    <MyThemeProvider value={initialState}>
      <Styles>
        <div>Parent</div>
        <ChildrenComponent />
      </Styles>
    </MyThemeProvider>
  );
};

const ChildrenComponent = () => {
  const { theme, setTheme } = useMyThemeContext();

  useEffect(() => {
    if (theme) {
      setTimeout(() => {
        setTheme((prev) => ({
          ...prev,
          primaryColor: "white",
          color: "black",
        }));
      }, 2 * 1000);
    }
  }, []);

  console.log(theme);

  return (
    <div>
      <div>Children</div>
      <div
        style={{
          backgroundColor: theme.primaryColor,
          color: theme.color
        }}
      >
        {theme.primaryColor}
      </div>
    </div>
  );
};
