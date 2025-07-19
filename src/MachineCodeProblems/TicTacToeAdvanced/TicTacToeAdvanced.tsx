import { buildPatterns, checkForWin } from "./utils";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DEFAULTS = {
  FIRST_PLAYER: "X",
  SECOND_PLAYER: "O",
};

interface IBoardPStyleProps {
  size: number;
}

const Styles = styled.div`
  .action-wrapper {
    margin: 16px 0px;
  }
`;

const Board = styled.div<IBoardPStyleProps>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
  gap: 16px;
`;

const Cell = styled.div`
  width: 56px;
  height: 56px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;

  place-content: center;
  font-weight: bold;
  color: black;
`;

export const TicTacToeAdvanced = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [boardState, setBoardState] = useState<Array<string>>([]);
  const nextTurnSymbol = useRef<string>(DEFAULTS.FIRST_PLAYER);
  const filledCellCount = useRef<number>(0);
  const winPatterns = useRef<Array<Array<number>>>([[]]);

  useEffect(() => generateBoard(boardSize), [boardSize]);

  const generateBoard = (size: number) => {
    const list = new Array(size * size).fill("");
    setBoardState(list);

    const result = buildPatterns(boardSize);
    winPatterns.current = result;
  };

  /*
    Form Methods
  */

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const size = form.get("size")?.toString();
    setBoardSize(Number(size));
  };

  /*
    Board Methods
  */

  const handleBoardCellClicked = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const index = Number(event.currentTarget.getAttribute("data-id"));
    const boardCopy = [...boardState];

    

    if (boardCopy[index] === "") {
      boardCopy[index] = nextTurnSymbol.current;
      nextTurnSymbol.current =
        nextTurnSymbol.current === DEFAULTS.FIRST_PLAYER
          ? DEFAULTS.SECOND_PLAYER
          : DEFAULTS.FIRST_PLAYER;
      filledCellCount.current++;
      setBoardState(boardCopy);
    }

    const result = checkForWin(winPatterns.current, boardCopy);
    if(result){
        alert("We have a Winner : " + result);
    }

    if (filledCellCount.current === boardState.length) {
        alert("Game is finished");
    }
  };

  return (
    <Styles>
      <div className="action-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="size"
            placeholder="Enter size"
            autoComplete="off"
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <Board className="board-wrapper" size={boardSize}>
        {boardState.map((cell: string, index: number) => {
          return (
            <Cell
              key={index}
              data-id={index}
              className="cell-item"
              onClick={handleBoardCellClicked}
            >
              <span>{cell}</span>
            </Cell>
          );
        })}
      </Board>
    </Styles>
  );
};
