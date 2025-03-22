import { FC, ReactElement } from "react";
import styled from "styled-components";

const NotFoundErrorPageStyles = styled.div``;

const DEFAULT_MESSAGE = "404 Page not found";

interface INotFoundErrorPageProps {
  message?: string;
}

export const NotFoundErrorPage: FC<INotFoundErrorPageProps> = (
  props: INotFoundErrorPageProps
): ReactElement => {
  return (
    <NotFoundErrorPageStyles>
      {props.message || DEFAULT_MESSAGE}
    </NotFoundErrorPageStyles>
  );
};
