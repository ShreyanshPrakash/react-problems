import { FC, ReactElement } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const NestedCommentsRunnerStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface INestedCommentsRunnerProps {}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [NestedCommentsRunner Component]======================================================
*/

export const NestedCommentsRunner: FC<
  INestedCommentsRunnerProps
> = ({}: INestedCommentsRunnerProps): ReactElement => {
  return <NestedCommentsRunnerStyles>Template</NestedCommentsRunnerStyles>;
};
