import { IBoard } from "MachineCodeProblems/TicTacToe/TicTacToe.types";
import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 7],
  [1, 5, 8],
  [2, 6, 9],
  [0, 5, 9],
  [3, 5, 7],
];

class MatchStateModel {
  isActive;
  isFinished;
  result;
  constructor() {
    this.isActive = false;
    this.isFinished = false;
    this.result = "";
  }

  setActiveState(newState: boolean) {
    this.isActive = newState;
    return this;
  }
}

const Styles = styled.div``;

export const TicTacToe = () => {
  return (
    <Styles>
      <Board rows={3} columns={3} />
    </Styles>
  );
};

const BoardStyles = styled.div`
  .inner-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    width: 264px;
  }
`;

const BoardCell = styled.div`
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  border: 2px solid white;
  text-align: center;

  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Board: FC<IBoard> = ({ rows, columns }): React.ReactElement => {
  const currentMarker = useRef<string>("X");
  const cellFilledCount = useRef<number>(0);
  const [boardCellState, setBoardCellState] = useState<Array<string>>(
    new Array(rows * columns).fill("")
  );
  const [matchState, setMatchState] = useState(new MatchStateModel());

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const cellIndex = Number(event.currentTarget.getAttribute("data-index"));
    if (cellIndex !== null && boardCellState[cellIndex] === "") {
      let updatedState = [...boardCellState];
      updatedState[cellIndex] = currentMarker.current;
      setBoardCellState(updatedState);
      currentMarker.current = currentMarker.current === "X" ? "0" : "X";
      cellFilledCount.current++;

      const winner = detectWin(updatedState, WIN_PATTERNS);

      if (winner) {
        console.log(`Match Completed. We have a winner : ${winner}`);
        return;
      }

      if (cellFilledCount.current === boardCellState.length) {
        console.log("Match completed");
      }
    }
  };

  const detectWin = (
    boardState: Array<string>,
    patterns: Array<Array<number>>
  ): string => {
    let winner = "";
    for (let [a, b, c] of patterns) {
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        winner = boardState[a];
        break;
      }
    }
    return winner;
  };

  return (
    <BoardStyles>
      <div className="inner-wrapper">
        {boardCellState.map((item: string, index: number) => {
          return (
            <BoardCell key={index} data-index={index} onClick={handleCellClick}>
              {item}
            </BoardCell>
          );
        })}
      </div>
    </BoardStyles>
  );
};
