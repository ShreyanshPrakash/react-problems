import styled from "styled-components";

const Styles = styled.div`
  width: 560px;
  height: 560px;
  border: 2px solid white;
  position: relative;

  .border {
    border: 2px solid white;
  }

  .box {
    width: 100px;
    height: 100px;
  }

  .relative {
    position: relative;
    top: 10px;
  }

  .absolute {
    position: absolute;
    top: 240px;
  }

  .fixed {
    position: fixed;
    top: 0px;
  }

  .sticky {
    position: sticky;
    top: 0px;
  }
`;

export const CssPositions = () => {
  return (
    <Styles className="border">
      <div className="relative border box">Relative</div>
      <div className="absolute border box">Absolute</div>
      <div className="fixed border box">Fixed</div>
      <div className="sticky border box">Sticky</div>
    </Styles>
  );
};
