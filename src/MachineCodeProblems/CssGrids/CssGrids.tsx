import styled from "styled-components";

const Styles = styled.div`
  border: 2px solid white;

  .item {
    border: 2px solid black;
    background-color: white;
    color: black;
    place-content: center;
  }

  .container {
    width: 800px;
    height: 560px;
    display: grid;
    /* grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr); */
    /* grid-template: repeat(5, 1fr) / repeat(5, 1fr); */
    grid:
      ". . . itemOne ."
      ". . . itemOne ."
      ". itemFive . itemOne .";
  }

  .item-1 {
    /* grid-row: 2 / 3;
    grid-column: 3/ 4; */
    grid-area: itemOne;
  }

  .item-5 {
    /* grid-row: 2 / 3;
    grid-column: 3/ 4; */
    grid-area: itemFive;
  }
`;

const DEFAULTS = {
  ITEMS: [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ],
};

export const CssGrids = ({ items = DEFAULTS.ITEMS }) => {
  return (
    <Styles>
      <div className="container">
        {items.map((item: { id: number }, index: number) => (
          <div key={index} className={`item-${index} item`}>
            <span>{index}</span>
          </div>
        ))}
      </div>
    </Styles>
  );
};
