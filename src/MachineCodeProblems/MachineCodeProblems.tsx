import { Outlet } from "react-router";
import styled from "styled-components";

const MachineCodeProblemsStyles = styled.div``;

export const MachineCodeProblems = () => {

  return (
    <MachineCodeProblemsStyles>
        <Outlet />
    </MachineCodeProblemsStyles>
  );
};
