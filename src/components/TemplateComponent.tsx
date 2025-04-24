import { FC, ReactElement } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const TemplateStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IPaginationProps {}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [Template Component]======================================================
*/

export const Template: FC<
  IPaginationProps
> = ({}: IPaginationProps): ReactElement => {
  return <TemplateStyles>Template</TemplateStyles>;
};
