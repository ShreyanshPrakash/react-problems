import { useMyFeatureContext } from "./contextHook";
import { MyFeatureContextProvider } from "./contextProvider";
import { IFeatureProps } from "./types";
import { FC } from "react";
import styled from "styled-components";

const Styles = styled.div``;

export const FeatureFlags = () => {
  return (
    <Styles>
      <MyFeatureContextProvider>
        <Feature flag="showTitle">Hello world</Feature>
      </MyFeatureContextProvider>
    </Styles>
  );
};

const Feature: FC<React.PropsWithChildren<IFeatureProps>> = ({
  flag,
  children,
}) => {
  const context = useMyFeatureContext();

  return <>{context[flag] ? children : null}</>;
};
