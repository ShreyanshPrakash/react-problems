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
        <Feature field="showTitle">Hello world</Feature>
      </MyFeatureContextProvider>
    </Styles>
  );
};

const Feature: FC<React.PropsWithChildren<IFeatureProps>> = ({
  field,
  children,
}) => {
  const context = useMyFeatureContext();

  return <>{context[field] ? children : null}</>;
};
