import { FC, ReactElement } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const NestedCommentsStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface INestedCommentsProps {}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [NestedComments Component]======================================================
*/

export const NestedComments: FC<
  INestedCommentsProps
> = ({}: INestedCommentsProps): ReactElement => {
  return <NestedCommentsStyles>Template</NestedCommentsStyles>;
};
