import { Outlet } from "react-router";
import styled from "styled-components";

const RevisionStyles = styled.div``;

export const Revision = () => {

  return (
    <RevisionStyles>
        <Outlet />
    </RevisionStyles>
  );
};
